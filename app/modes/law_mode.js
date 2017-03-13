settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.wordpicture = false;


$("#lemgram_list_item").remove();
$("#results-lemgram").remove();
$("#showLineDiagram").remove();

var modernAttrs2 = _.extend({}, modernAttrs, {
    ne_ex: attrs.ne_ex,
    ne_type: attrs.ne_type,
    ne_subtype: attrs.ne_subtype,
    ne_name: attrs.ne_name,
    complemgram: {
        label: "complemgram",
        internalSearch: true,
        ranked: true,
        display: {
            expandList: {
                splitValue: function(value) { return value.split("+"); },
                searchKey: "lex",
                joinValues: " + ",
                stringify: function(lemgram) { return util.lemgramToString(lemgram, true); },
                linkAllValues: true
            }
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    compwf: {
        label: "compwf",
        display: {
            "expandList": {}
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    sense: {
        label: "sense",
        type: "set",
        ranked: true,
        display: {
            expandList: {
                internalSearch: function(key, value) { return "[" + key + " = '\\|" + regescape(value) + ":.*']"},
            }
        },
        stringify: function(sense) { return util.saldoToString(sense, true); },
        opts: probabilitySetOptions,
        externalSearch: "https://spraakbanken.gu.se/karp/#?search=extended||and|sense|equals|<%= val %>",
        internalSearch: true,
        extendedTemplate: settings.senseAutoComplete
    }
});
delete modernAttrs2.saldo;

settings.corpora = {};
settings.corporafolders = {};

settings.corporafolders.lag1700 = {
    title: "1734 års lag och förarbeten",
    contents: ["lag1734", "forarbeten1734"]
};

settings.corporafolders.fsvlagar = {
    title: "Fornsvenska textbankens lagtexter",
    contents: ["fsv-aldrelagar", "fsv-yngrelagar"]
};

settings.corporafolders.modern = {
    title: "Moderna lagar och rättsfall",
    contents: ["sfs", "moderntdv"]
};

settings.corpora["fsv-yngrelagar"] = fsv_yngrelagar;

settings.corpora["fsv-aldrelagar"] = fsv_aldrelagar;


settings.corpora["lag1734"] = {
    morf: 'swedbergm|dalinm',
    id: "lag1734",
    title: "1734 års lag",
    description: "Materialet utgörs av balkarna i själva lagtexten, förordet samt domarreglerna. Materialet är inskrivet för hand och korrekturläst, men en del fel finns fortfarande kvar.",
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        lemma: attrs.baseform,
        lex: attrs.lemgram,
        typograph: {
            label: "typography",
            type: "set",
            translationKey: "fab_",
            dataset: [
                "bold",
                "smallcaps",
                "headline",
                "marginal",
                "footnote",
                "italic",
                "emphasis"
            ],
            opts: liteOptions
        },
    },
    struct_attributes: {
        //paragraph_marginal: {label: "paragraph_marginal"},
        text_date: {label: "date"},
        text_title: {
            label: "title",
            localize: false,
            dataset: [
                "1734 års lag Förord",
                "1734 års lag Domareregler",
                "1734 års lag Lagtext",
            ],
            opts: liteOptions
        }
    }
};

settings.corpora["forarbeten1734"] = {
    morf: 'swedbergm|dalinm',
    id: "forarbeten1734",
    title: "Förarbeten",
    description: "Förarbetena till 1734 års lag utgörs av material från lagkommissionen till 1734 års lag. Materialet är från 1686–1735, utgivet av Vilhelsm Sjögren 1900–1909. Materialet utgörs av protokoll från sammanträdena (vol. 1–3); lagkommissionens förslag (vol. 4 –6); utlåtanden över lagkommissionens förslag (vol. 7) samt riksdagshandlingar angående lagkommissionens förslag (vol. 8). Materialet är OCR-skannat med manuell efterarbetning.",
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        lemma: attrs.baseform,
        lex: attrs.lemgram,
        typograph: {
            label: "typography",
            type: "set",
            translationKey: "fab_",
            dataset: [
                "bold",
                "smallcaps",
                "headline",
                "marginal",
                "footnote",
                "italic",
                "emphasis"
            ],
            opts: liteOptions
        },
    },
    struct_attributes: {
        //paragraph_marginal: {label: "paragraph_marginal"},
        text_date: {label: "date"},
        text_title: {
            label: "title",
            localize: false,
            dataset: [
                "1734 års lag Förarbeten vol 1",
                "1734 års lag Förarbeten vol 2",
                "1734 års lag Förarbeten vol 3",
                "1734 års lag Förarbeten vol 4",
                "1734 års lag Förarbeten vol 5",
                "1734 års lag Förarbeten vol 6",
                "1734 års lag Förarbeten vol 7",
                "1734 års lag Förarbeten vol 8"
            ],
            opts: liteOptions
        }
    }
};

settings.corpora["sfs"] = {
    id: "sfs",
    title: "Svensk författningssamling",
    description: "",
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        posset: settings.posset,
        msd: attrs.msd,
        lemma: attrs.baseform,
        lex: attrs.lemgram,
        saldo: attrs.saldo,
        prefix: attrs.prefix,
        suffix: attrs.suffix,
        dephead: attrs.dephead,
        deprel: attrs.deprel,
        ref: attrs.ref
    },
    struct_attributes: {
        text_date: {label: "date"},
        text_title: {label: "title"}
    }
};

settings.corpora["moderntdv"] = {
    id: "moderntdv",
    title: "Domar",
    description: "",
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        posset: settings.posset,
        msd: attrs.msd,
        lemma: attrs.baseform,
        lex: attrs.lemgram,
        saldo: attrs.saldo,
        prefix: attrs.prefix,
        suffix: attrs.suffix,
        dephead: attrs.dephead,
        deprel: attrs.deprel,
        ref: attrs.ref
    },
    struct_attributes: {
        text_date: {label: "date"},
        text_title: {label: "title"}
    }
};

settings.corpora["lag1800"] = {
    morf: 'saldom|dalinm',
    id: "lag1800",
    title: "Lagar från 1800-talet",
    description: "Regeringsformen 1809 med ändringar 1809-1974, Författningssamling Låssa kyrkas arkiv 1800",
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        posset:  settings.posset,
        lemma: attrs.baseform,
        lex: attrs.lemgram,
        saldo: attrs.saldo,
        prefix: attrs.prefix,
        suffix: attrs.suffix
    },
    struct_attributes: {
        text_title: {
            localize: false,
            label: "title",
            dataset: [
                "Författningssamling 1800 Låssa kyrkas arkiv",
                "Regeringsformen 1809 "
            ],
            opts: liteOptions
        },
        text_date: {label: "date"},
        text_marginal: {label: "paragraph_marginal"}
    }
};


settings.corpora["tankebok"] = {
    morf: 'swedbergm|dalinm',
    id: "tankebok",
    title: "Stockholms stads tänkeböcker",
    description: "Stockholms stads tänkeböcker från 1626",
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        posset:  settings.posset,
        lemma: attrs.baseform,
        lex: attrs.lemgram
    },
    struct_attributes: {
        text_date: {label: "date"},
        text_title: {
            label: "title",
            localize: false,
            dataset: [
                "Stockholms stads tänkebok - Koncept ",
                "Stockholms stads tänkebok - Notariat",
                "Stockholms stads tänkebok - Renskr "
            ],
            opts: liteOptions

        },
        paragraph_marginal: {label: "paragraph_marginal"}
    }
};


settings.corpusListing = new CorpusListing(settings.corpora);
