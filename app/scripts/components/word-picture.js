/** @format */
import angular from "angular"
import settings from "@/settings"
import { html, isLemgram, loc, splitLemgram } from "@/util"

angular.module("korpApp").component("wordPicture", {
    template: html`
        <div class="wordpic_disabled" ng-if="!$ctrl.wordPic">
            {{'word_pic_warn' | loc:$root.lang}}
            <div>
                <button class="btn btn-sm btn-default activate_word_pic" ng-click="$ctrl.activate()">
                    {{'word_pic_warn_btn' | loc:$root.lang}}
                </button>
            </div>
        </div>
        <warning ng-if="$ctrl.wordPic && !$ctrl.hasData && !$ctrl.loading && !$ctrl.aborted"
            >{{'word_pic_bad_search' | loc:$root.lang}}</warning
        >
        <warning ng-if="$ctrl.wordPic && $ctrl.aborted && !$ctrl.loading"
            >{{'search_aborted' | loc:$root.lang}}</warning
        >
        <warning ng-if="$ctrl.wordPic && $ctrl.noHits">{{"no_stats_results" | loc:$root.lang}}</warning>
        <div ng-if="$ctrl.wordPic && $ctrl.hasData">
            <div id="wordPicSettings">
                <div>
                    <input id="wordclassChk" ng-model="$ctrl.showWordClass" type="checkbox" /><label for="wordclassChk"
                        >{{'show_wordclass' | loc:$root.lang}}</label
                    >
                </div>
                <div>
                    <select id="numberHitsSelect" ng-model="$ctrl.settings.showNumberOfHits">
                        <option ng-repeat="hitSetting in $ctrl.hitSettings" value="{{hitSetting}}">
                            {{ $ctrl.localeString(lang, hitSetting) }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="content_target">
                <div class="tableContainer radialBkg" ng-repeat="word in $ctrl.data">
                    <div class="header" ng-if="!$ctrl.isLemgram(word.token)">
                        {{word.token}} (<span>{{word.wordClassShort | loc:$root.lang}}</span>)
                    </div>
                    <div class="lemgram_section" ng-repeat="section in word.data" ng-init="parentIndex = $index">
                        <div class="lemgram_help">
                            <span
                                ng-repeat="header in $ctrl.getResultHeader(parentIndex, word.wordClass)"
                                ng-class="$ctrl.getHeaderClasses(header, word.token)"
                                ng-if="$ctrl.renderResultHeader(parentIndex, section, word.wordClass, $index)"
                                ><span ng-if="header != '_'"
                                    >{{$ctrl.getHeaderLabel(header, section, $index) | loc:$root.lang}}</span
                                ><span ng-if="header == '_'"><b>{{$ctrl.fromLemgram(word.token)}}</b></span></span
                            >
                        </div>
                        <div
                            class="lemgram_result"
                            ng-repeat="table in section"
                            ng-if="$ctrl.renderTable(table.table)"
                            ng-class="$ctrl.getTableClass(word.wordClass, parentIndex, $index)"
                        >
                            <table>
                                <tbody>
                                    <tr
                                        ng-repeat="row in $ctrl.minimize(table.table)"
                                        ng-init="data = $ctrl.parseLemgram(row, table.all_lemgrams)"
                                    >
                                        <td><span class="enumerate"></span></td>
                                        <td>
                                            {{ data.label }}<sup ng-if="data.showIdx">{{data.idx}}</sup>
                                            <span ng-if="$ctrl.showWordClass">({{data.pos | loc:$root.lang}})</span>
                                        </td>
                                        <td title="mi: {{row.mi | number:2}}">{{row.freq}}</td>
                                        <td ng-click="$ctrl.onClickExample($event, row)">
                                            <span class="word-pic-kwic-example ui-icon ui-icon-document"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: {
        wordPic: "<",
        activate: "<",
        loading: "<",
        hasData: "<",
        aborted: "<",
        hitSettings: "<",
        settings: "<",
        data: "<",
        noHits: "<",
    },
    controller: [
        "$rootScope",
        function ($rootScope) {
            const $ctrl = this

            $ctrl.showWordClass = false

            $ctrl.localeString = function (lang, hitSetting) {
                if (hitSetting === "1000") {
                    return loc("word_pic_show_all", lang)
                } else {
                    return loc("word_pic_show_some", lang) + " " + hitSetting + " " + loc("word_pic_hits", lang)
                }
            }

            $ctrl.renderResultHeader = function (parentIndex, section, wordClass, index) {
                return section[index] && section[index].table
            }

            $ctrl.getHeaderLabel = function (header, section, idx) {
                if (header.alt_label) {
                    return header.alt_label
                } else {
                    return `rel_${section[idx].rel}`
                }
            }

            $ctrl.getHeaderClasses = function (header, token) {
                if (header !== "_") {
                    return `lemgram_header_item ${header.css_class}`
                } else {
                    let classes = "hit"
                    if (isLemgram(token)) {
                        classes += " lemgram"
                    }
                    return classes
                }
            }

            $ctrl.isLemgram = isLemgram

            $ctrl.fromLemgram = function (maybeLemgram) {
                if (isLemgram(maybeLemgram)) {
                    return splitLemgram(maybeLemgram).form
                } else {
                    return maybeLemgram
                }
            }

            $ctrl.getResultHeader = (index, wordClass) => settings["word_picture_conf"][wordClass][index]

            $ctrl.renderTable = (obj) => obj instanceof Array

            $ctrl.getTableClass = (wordClass, parentIdx, idx) =>
                settings["word_picture_conf"][wordClass][parentIdx][idx].css_class

            $ctrl.minimize = (table) => table.slice(0, $ctrl.settings.showNumberOfHits)

            $ctrl.parseLemgram = function (row) {
                const set = row[row.show_rel].split("|")
                const lemgram = set[0]

                let infixIndex = ""
                let concept = lemgram
                infixIndex = ""
                let type = "-"

                const prefix = row.depextra

                if (isLemgram(lemgram)) {
                    const match = splitLemgram(lemgram)
                    infixIndex = match.index
                    if (row.dep) {
                        concept = match.form.replace(/_/g, " ")
                    } else {
                        concept = "-"
                    }
                    type = match.pos.slice(0, 2)
                }
                return {
                    label: prefix + " " + concept,
                    pos: type,
                    idx: infixIndex,
                    showIdx: !(infixIndex === "" || infixIndex === "1"),
                }
            }

            $ctrl.onClickExample = function (event, row) {
                const data = row

                const opts = {}
                opts.ajaxParams = {
                    start: 0,
                    end: 24,
                    command: "relations_sentences",
                    source: data.source.join(","),
                    corpus: data.corpus,
                }

                $rootScope.kwicTabs.push({ queryParams: opts })
            }
        },
    ],
})
