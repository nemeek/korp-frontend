/** @format */
import _ from "lodash"
import settings from "@/settings"
import { reduceStringify } from "../config/statistics_config"
import { hitCountHtml } from "@/util"
const pieChartImg = require("../img/stats2.png")

const createStatisticsService = function () {
    const createColumns = function (corpora, reduceVals, reduceValLabels) {
        const valueFormatter = function (row, cell, value, columnDef, dataContext) {
            return hitCountHtml(...dataContext[columnDef.id + "_value"], window.lang)
        }

        const corporaKeys = _.keys(corpora)
        const minWidth = 100
        const columns = []
        const cl = settings.corpusListing.subsetFactory(corporaKeys)
        const attrObj = cl.getStructAttrs()
        for (let [reduceVal, reduceValLabel] of _.zip(reduceVals, reduceValLabels)) {
            columns.push({
                id: reduceVal,
                translation: reduceValLabel,
                field: "hit_value",
                sortable: true,
                formatter(row, cell, value, columnDef, dataContext) {
                    if (dataContext["rowId"] !== 0) {
                        const formattedValue = reduceStringify(reduceVal, dataContext[reduceVal], attrObj[reduceVal])
                        dataContext["formattedValue"][reduceVal] = formattedValue
                        return `<span class="statistics-link" data-row=${dataContext["rowId"]}>${formattedValue}</span>`
                    } else {
                        return "&Sigma;"
                    }
                },
                minWidth,
                cssClass: "parameter-column",
            })
        }

        columns.push({
            id: "pieChart",
            name: "",
            field: "hit_value",
            sortable: false,
            formatter(row, cell, value, columnDef, dataContext) {
                return `<img id="circlediagrambutton__${dataContext.rowId}" src="${pieChartImg}" class="arcDiagramPicture"/>`
            },
            maxWidth: 25,
            minWidth: 25,
        })

        columns.push({
            id: "total",
            name: "stats_total",
            field: "total_value",
            sortable: true,
            formatter: valueFormatter,
            minWidth,
            headerCssClass: "localized-header",
        })

        $.each(corporaKeys.sort(), (i, corpus) => {
            return columns.push({
                id: corpus,
                translation: settings.corpora[corpus.toLowerCase()].title,
                field: corpus + "_value",
                sortable: true,
                formatter: valueFormatter,
                minWidth,
            })
        })
        return columns
    }

    const processData = function (
        def,
        originalCorpora,
        data,
        reduceVals,
        reduceValLabels,
        ignoreCase,
        prevNonExpandedCQP
    ) {
        const columns = createColumns(data.corpora, reduceVals, reduceValLabels)

        const statsWorker = new Worker(new URL("./statistics_worker", import.meta.url))
        statsWorker.onmessage = function (e) {
            const searchParams = {
                reduceVals,
                ignoreCase,
                originalCorpora,
                corpora: _.keys(data.corpora),
                prevNonExpandedCQP,
            }
            let result = [e.data, columns, searchParams]
            // Invoke configurable stats rewriting
            if (settings.stats_rewrite) {
                result = settings.stats_rewrite(result)
            }
            def.resolve(result)
        }

        statsWorker.postMessage({
            type: "korpStatistics",
            data,
            reduceVals,
            groupStatistics: settings["group_statistics"],
        })
    }

    return { processData }
}

export const statisticsService = createStatisticsService()
