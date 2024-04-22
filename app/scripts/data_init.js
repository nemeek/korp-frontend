/** @format */
import _ from "lodash"
import settings, { setDefaultConfigValues } from "@/settings"
import currentMode from "@/mode"
import model from "@/model"
import * as treeUtil from "./components/corpus_chooser/util"
import { CorpusListing } from "./corpus_listing"
import { ParallelCorpusListing } from "./parallel/corpus_listing"
import { httpConfAddMethodFetch } from "@/util"

// TODO it would be better only to load additional languages when there is a language change
async function initLocales() {
    const packages = ["locale", "corpora"]
    const prefix = "translations"
    const locData = {}

    const defs = []
    for (let langObj of settings["languages"]) {
        const lang = langObj.value
        locData[lang] = {}
        for (let pkg of packages) {
            let file = pkg + "-" + lang + ".json"
            file = prefix + "/" + file
            const def = new Promise((resolve) => {
                fetch(file)
                    .then((response) => {
                        if (response.status >= 300) {
                            throw new Error()
                        }
                        response.json().then((data) => {
                            _.extend(locData[lang], data)
                        })
                        resolve()
                    })
                    .catch(() => {
                        resolve()
                        console.log("No language file: ", file)
                    })
            })
            defs.push(def)
        }
    }

    for (const def of defs) {
        await def
    }

    window.loc_data = locData
    return locData
}

async function getInfoData() {
    const conf = httpConfAddMethodFetch({
        url: settings["korp_backend_url"] + "/corpus_info",
        params: {
            corpus: _.map(settings.corpusListing.corpora, "id")
                .map((a) => a.toUpperCase())
                .join(","),
        },
    })

    const response = await fetch(conf.url, conf)
    const data = await response.json()

    for (let corpus of settings.corpusListing.corpora) {
        corpus["info"] = data["corpora"][corpus.id.toUpperCase()]["info"]
        const privateStructAttrs = []
        for (let attr of data["corpora"][corpus.id.toUpperCase()].attrs.s) {
            if (attr.indexOf("__") !== -1) {
                privateStructAttrs.push(attr)
            }
        }
        corpus["private_struct_attributes"] = privateStructAttrs
    }
}

async function getTimeData() {
    const timeProxy = new model.TimeProxy()
    const args = await timeProxy.makeRequest()

    let [dataByCorpus, all_timestruct, rest] = args

    if (all_timestruct.length == 0) {
        return [[], []]
    }

    // this adds data to the corpora in settings
    for (let corpus in dataByCorpus) {
        let struct = dataByCorpus[corpus]
        if (corpus !== "time") {
            const cor = settings.corpora[corpus.toLowerCase()]
            timeProxy.expandTimeStruct(struct)
            cor.non_time = struct[""]
            struct = _.omit(struct, "")
            cor.time = struct
            if (_.keys(struct).length > 1) {
                if (cor.common_attributes == null) {
                    cor.common_attributes = {}
                }
                cor.common_attributes.date_interval = true
            }
        }
    }
    return [all_timestruct, rest]
}

async function getConfig() {
    // Load static corpus config if it exists.
    try {
        const corpusConfig = require(`modes/${currentMode}_corpus_config.json`)
        console.log(`Using static corpus config`)
        return corpusConfig
    } catch {}

    let configUrl
    // The corpora to include can be defined elsewhere can in a mode
    if (settings["corpus_config_url"]) {
        configUrl = await settings["corpus_config_url"]()
    } else {
        const labParam = process.env.ENVIRONMENT == "staging" ? "&include_lab" : ""
        configUrl = `${settings["korp_backend_url"]}/corpus_config?mode=${currentMode}${labParam}`
    }
    let response
    try {
        response = await fetch(configUrl)
    } catch (error) {
        throw Error("Config request failed")
    }

    if (!response.ok) {
        console.error("Something wrong with corpus config", response.statusText)
        throw Error("Something wrong with corpus config")
    }

    return await response.json()
}

function transformConfig(modeSettings) {
    // only if the current mode is parallel, we load the special code required
    if (modeSettings["parallel"]) {
        require("./parallel/corpus_listing.js")
        require("./parallel/stats_proxy.js")
    }

    function rename(obj, from, to) {
        if (obj[from]) {
            obj[to] = obj[from]
            delete obj[from]
        }
    }

    rename(modeSettings["attributes"], "pos_attributes", "attributes")

    // take the backend configuration format for attributes and expand it
    // TODO the internal representation should be changed to a new, more compact one.
    for (const corpusId in modeSettings["corpora"]) {
        const corpus = modeSettings["corpora"][corpusId]

        if (corpus["title"] == undefined) {
            corpus["title"] = corpusId
        }

        rename(corpus, "pos_attributes", "attributes")
        for (const attrType of ["attributes", "struct_attributes", "custom_attributes"]) {
            const attrList = corpus[attrType]
            const attrs = {}
            const newAttrList = []
            for (const attrIdx in attrList) {
                const attr = modeSettings["attributes"][attrType][attrList[attrIdx]]
                attrs[attr.name] = attr
                newAttrList.push(attr.name)
            }
            // attrs is an object of attribute settings
            corpus[attrType] = attrs
            // attrList is an ordered list of the preferred order of attributes
            corpus[`_${attrType}_order`] = newAttrList
        }
        // TODO use the new format instead
        // remake the new format of witihns and contex to the old
        const sortingArr = ["sentence", "paragraph", "text", "1 sentence", "1 paragraph", "1 text"]
        function contextWithinFix(list) {
            // sort the list so that sentence is before paragraph
            list.sort((a, b) => sortingArr.indexOf(a.value) - sortingArr.indexOf(b.value))
            const res = {}
            for (const elem of list) {
                res[elem.value] = elem.value
            }
            return res
        }
        corpus["within"] = contextWithinFix(corpus["within"])
        corpus["context"] = contextWithinFix(corpus["context"])
    }

    delete modeSettings["attributes"]

    if (!modeSettings["folders"]) {
        modeSettings["folders"] = {}
    }
    return modeSettings
}

function setInitialCorpora() {
    // if no preselectedCorpora is defined, use all of them
    if (!(settings["preselected_corpora"] && settings["preselected_corpora"].length)) {
        // if all corpora in mode is limited_access, make them all preselected
        if (settings.corpusListing.corpora.filter((corpus) => !corpus.limited_access).length == 0) {
            settings["preselected_corpora"] = _.map(
                _.filter(settings.corpusListing.corpora, (corpus) => !corpus.hide),
                "id"
            )
            // else filter out the ones with limited_access
        } else {
            settings["preselected_corpora"] = _.map(
                _.filter(settings.corpusListing.corpora, (corpus) => !(corpus.hide || corpus.limited_access)),
                "id"
            )
        }
    } else {
        let expandedCorpora = []
        for (let preItem of settings["preselected_corpora"]) {
            preItem = preItem.replace(/^__/g, "")
            expandedCorpora = [].concat(expandedCorpora, treeUtil.getAllCorporaInFolders(settings["folders"], preItem))
        }
        // folders expanded, save
        settings["preselected_corpora"] = expandedCorpora
    }

    const corpusParam = new URLSearchParams(window.location.hash.slice(2)).get("corpus")

    let currentCorpora
    if (corpusParam) {
        currentCorpora = _.flatten(
            _.map(corpusParam.split(","), (val) => treeUtil.getAllCorporaInFolders(settings["folders"], val))
        )
    } else {
        currentCorpora = settings["preselected_corpora"]
    }

    settings.corpusListing.select(currentCorpora)
}

/**
 * This function is part of Korp's initialization process
 * It both fetches data, such as config and populates the
 * `settings` object.
 */
export async function fetchInitialData(authDef) {
    settings["korp_backend_url"] = settings["korp_backend_url"].trim()
    if (settings["korp_backend_url"].slice(-1) == "/") {
        settings["korp_backend_url"] = settings["korp_backend_url"].slice(0, -1)
    }
    if (!settings["korp_backend_url"].startsWith("http")) {
        console.error('"korp_backend_url" in config.yml must start with http:// or https://')
        return
    }

    if (settings["config_dependent_on_authentication"]) {
        await authDef
    }

    const translationFiles = initLocales()
    const config = await getConfig()
    const modeSettings = transformConfig(config)

    _.assign(settings, modeSettings)

    setDefaultConfigValues()

    if (!settings["parallel"]) {
        settings.corpusListing = new CorpusListing(settings.corpora)
    } else {
        settings.corpusListing = new ParallelCorpusListing(settings.corpora)
    }

    // if the previous config calls didn't yield any corpora, don't ask for info or time
    if (!_.isEmpty(settings["corpora"])) {
        const infoDef = getInfoData()
        let timeDef
        if (settings["has_timespan"]) {
            timeDef = getTimeData()
        }
        setInitialCorpora()

        await infoDef
        if (settings["has_timespan"]) {
            settings["time_data"] = await timeDef
        }
    }
    await translationFiles
}
