/** @format */
import statemachine from "@/statemachine"
import * as treeUtil from "./util"

export const corpusChooserComponent = {
    template: `
    <div class="absolute inset-0 bg-transparent"
        ng-click="$ctrl.showChooser = false"
        ng-if="$ctrl.showChooser"></div>
    <div class="scroll_checkboxes flex-shrink-0 ml-8" ng-class="{'cursor-pointer': $ctrl.initialized}">
        <div ng-click="$ctrl.onShowChooser()" class="hp_topframe no-underline flex justify-between items-center border border-gray-400 transition-all duration-500 hover_bg-blue-50 rounded h-12">
            <div ng-if="$ctrl.initialized">

                <span ng-if-start="$ctrl.selectCount != 1">{{ $ctrl.selectCount }}</span>
                <span>{{ 'corpselector_of' | loc:$root.lang }}</span>
                <span>{{ $ctrl.totalCount }}</span>
                <span ng-if-end>{{'corpselector_selectedmultiple' | loc:$root.lang }}</span>
                
                <span ng-if-start="$ctrl.selectCount == 1">{{ $ctrl.firstCorpus }}</span>
                <span ng-if-end>{{ 'corpselector_selectedone' | loc:$root.lang }}</span>
                
                <span class="text-gray-600">
                    — {{ $ctrl.suffixedNumbers($ctrl.selectedNumberOfTokens, $root.lang) }} {{ 'corpselector_of' | loc:$root.lang }} {{ $ctrl.suffixedNumbers($ctrl.totalNumberOfTokens, $root.lang) }} {{ 'corpselector_tokens' | loc:$root.lang }}
                </span>
            </div>
            <div ng-if="!$ctrl.initialized">
                <i class="fa-solid fa-spinner fa-pulse"></i>
            </div>
            <div class="transition-colors duration-500">
                <i class="fa-solid fa-caret-up relative top-2"></i>
                <br>
                <i class="fa-solid fa-caret-down relative bottom-2"></i>
            </div>
        </div>
        <div ng-if="$ctrl.showChooser"  class="corpus-chooser flex bg-gray-100">
            <div class="popupchecks flex-shrink-0 p-4 h-full">
                <div class="flex">
                    <cc-time-graph></cc-time-graph>
                    <div class="p-2">
                        <button ng-click="$ctrl.selectAll()" class="btn btn-default btn-sm w-full mb-2">
                            <span class="fa-solid fa-check"></span>
                            <span>{{'corpselector_buttonselectall' | loc:$root.lang }}</span>
                        </button>
                        <button ng-click="$ctrl.selectNone()" class="btn btn-default btn-sm w-full">
                            <span class="fa-solid fa-times"></span>
                            <span>{{ 'corpselector_buttonselectnone' | loc:$root.lang }}</span>
                        </button>
                    </div>
                </div>
                <!-- this is the beginning of the recursive component -->
                <cc-tree node="$ctrl.root" on-select="$ctrl.onSelect()" on-select-only="$ctrl.selectOnly(corporaIds)" on-show-info="$ctrl.onShowInfo(node)"></cc-tree>

                <p class="text-sm pb-4">
                    {{ $ctrl.selectedNumberOfSentences | prettyNumber }} {{'corpselector_sentences_long' | loc:$root.lang}}
                </p>
            </div>
            <cc-info-box ng-if="$ctrl.showInfoBox" class="sticky top-0" style="width: 480px" object="$ctrl.infoNode"></cc-info>
        </div>
    </div>
    `,
    bindings: {},
    controller: [
        "$rootScope",
        "$location",
        function ($rootScope, $location) {
            let $ctrl = this

            statemachine.listen("login", function () {
                $ctrl.credentials = authenticationProxy.loginObj.credentials
                // recalculate folder status and repaint it all
                $ctrl.updateLimitedAccess()
            })

            statemachine.listen("logout", function () {
                $ctrl.credentials = []
                let newCorpora = []
                for (let corpus of settings.corpusListing.getSelectedCorpora()) {
                    if (!settings.corpora[corpus].limitedAccess) {
                        newCorpora.push(corpus)
                    } else {
                        settings.corpora[corpus].selected = false
                    }
                }

                if (_.isEmpty(newCorpora)) {
                    newCorpora = settings.preselectedCorpora
                }
                settings.corpusListing.select(newCorpora)
                $ctrl.updateSelectedCount(newCorpora)
                $ctrl.updateLimitedAccess()
            })

            $ctrl.initialized = false
            $ctrl.showChooser = false

            $ctrl.onShowChooser = () => {
                // don't open the chooser unless the info-call is done
                if ($ctrl.initialized) {
                    $ctrl.showChooser = !$ctrl.showChooser
                }
            }

            // should be ON INFO-call done from statemachine
            $rootScope.$on("corpuschooserchange", (e, corpusIds) => {
                $ctrl.credentials = authenticationProxy.loginObj.credentials || []

                // change of corpora from outside the chooser
                // happens on initialzation when corpora is either decided by
                // settings.preselectedCorpora / URL query param
                if ($ctrl.initialized) {
                    return
                }

                $ctrl.initialized = true

                // remove the corpora with hide=true (linked corpora)
                const ccCorpora = Object.keys(settings.corpora).reduce((prev, current) => {
                    if (!settings.corpora[current].hide) {
                        prev[current] = settings.corpora[current]
                    }
                    return prev
                }, {})

                $ctrl.root = treeUtil.initCorpusStructure(ccCorpora, corpusIds)

                $ctrl.totalCount = Object.values(ccCorpora).length
                $ctrl.totalNumberOfTokens = $ctrl.root.tokens
                $ctrl.updateLimitedAccess()
                select(corpusIds)
            })

            $ctrl.updateSelectedCount = (selection) => {
                $ctrl.selectCount = selection.length
                $ctrl.selectedNumberOfTokens = 0
                $ctrl.selectedNumberOfSentences = 0
                for (const corpusId of selection) {
                    const corpus = settings.corpora[corpusId]
                    $ctrl.selectedNumberOfTokens += corpus.tokens
                    $ctrl.selectedNumberOfSentences += corpus.sentences
                }
            }

            $ctrl.suffixedNumbers = (num, lang) => {
                let out = ""
                if (num < 1000) {
                    // 232
                    out = num.toString()
                } else if (num >= 1000 && num < 1e6) {
                    // 232,21K
                    out = (num / 1000).toFixed(2).toString() + "K"
                } else if (num >= 1e6 && num < 1e9) {
                    // 232,21M
                    out = (num / 1e6).toFixed(2).toString() + "M"
                } else if (num >= 1e9 && num < 1e12) {
                    // 232,21G
                    out = (num / 1e9).toFixed(2).toString() + "G"
                } else if (num >= 1e12) {
                    // 232,21T
                    out = (num / 1e12).toFixed(2).toString() + "T"
                }
                return out.replace(".", util.getLocaleString("util_decimalseparator", lang))
            }

            $ctrl.onSelect = function () {
                const currentCorpora = treeUtil.getAllSelected($ctrl.root)
                select(currentCorpora)
            }

            $ctrl.selectAll = function () {
                select(_.map(Object.values(settings.corpora), (corpus) => corpus.id))
            }

            $ctrl.selectNone = function () {
                select([])
            }

            $ctrl.selectOnly = function (corporaIds) {
                select(corporaIds)
            }

            $ctrl.updateLimitedAccess = function () {
                treeUtil.updateLimitedAccess($ctrl.root, $ctrl.credentials)
            }

            function select(corporaIds) {
                const selection = treeUtil.filterCorporaOnCredentials(settings.corpora, corporaIds, $ctrl.credentials)
                treeUtil.recalcFolderStatus($ctrl.root)
                settings.corpusListing.select(selection)
                $ctrl.updateSelectedCount(selection)
                $rootScope.$broadcast("corpuschooserchange", selection)
                $location.search("corpus", selection.join(","))

                // used when there is only one corpus selected to show name
                // TODO this needs to be refactored to support titles in different languages
                if (selection.length == 1) {
                    const firstCorpus = settings.corpora[selection[0]].title
                    $ctrl.firstCorpus = firstCorpus.length > 39 ? firstCorpus.slice(0, 36) + "…" : firstCorpus
                }
            }

            $ctrl.onShowInfo = (node) => {
                $ctrl.showInfoBox = node.id != $ctrl.infoNode?.id
                $ctrl.infoNode = $ctrl.showInfoBox ? node : null
            }
        },
    ],
}
