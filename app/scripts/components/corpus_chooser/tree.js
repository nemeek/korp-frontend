/** @format */
import angular from "angular"
import * as treeUtil from "./util"
import settings from "@/settings"
var collapsedImg = require("../../../img/collapsed.png")
import { collatorSort, html } from "@/util"

angular.module("korpApp").component("ccTree", {
    template: html`
        <div ng-class="{ 'cc-level-indent' : $ctrl.indent }">
            <div
                ng-repeat="folder in $ctrl.sortedFolders"
                class="tree relative"
                ng-class="{ collapsed: !folder.extended, extended: folder.extended, disabled: folder['limited_access'] }"
            >
                <div class="flex">
                    <img
                        ng-click="$ctrl.toggleFolderVisibility(folder)"
                        src="${collapsedImg}"
                        alt="extend"
                        class="ext cursor-pointer self-start mt-2"
                    />
                    <label
                        class="flex-1 boxlabel cursor-pointer"
                        ng-click="$ctrl.toggleFolderSelection($event, folder)"
                    >
                        <span
                            class="inline-block checkbox mr-1"
                            ng-class="{ checked: folder.selected == 'all', unchecked: folder.selected == 'none', intermediate: folder.selected == 'some' }"
                        ></span>
                        <span>{{ folder.title | locObj:$root.lang }}</span>
                        <span class="numberOfChildren">({{folder.numberOfChildren}})</span>
                    </label>
                    <i
                        ng-click="$ctrl.showInfo($event, folder)"
                        class="fa-solid text-xl fa-info-circle text-gray-700 rounded-full bg-white text-blue-500 mr-1 mt-1 h-fit"
                    ></i>
                </div>
                <cc-tree
                    ng-if="folder.extended"
                    node="folder"
                    indent="true"
                    on-select="$ctrl.onChildSelect()"
                    on-select-only="$ctrl.selectOnly(corporaIds)"
                    on-show-info="$ctrl.onShowInfoLocal(node)"
                ></cc-tree>
            </div>
            <div
                ng-repeat="corpus in $ctrl.sortedCorpora"
                class="boxdiv flex"
                ng-class="{ 'disabled cursor-default': !corpus.userHasAccess, 'cursor-pointer': corpus.userHasAccess }"
                style="margin-left:16px; background-color: rgb(221, 233, 255); margin-bottom: 2px; padding-top: 1px; padding-bottom: 1px;"
                ng-click="$ctrl.toggleCorpusSelection($event, corpus)"
            >
                <span
                    class="mx-1 my-1 checkbox"
                    ng-class="{ checked: corpus.selected, unchecked: !corpus.selected }"
                ></span>
                <label class="px-1 flex-1"> {{ corpus.title | locObj:$root.lang }} </label>
                <i ng-if="corpus['limited_access'] && corpus.userHasAccess" class="fa-solid fa-unlock mx-1 my-1"></i>
                <i
                    ng-click="$ctrl.showInfo($event, corpus)"
                    style="margin-top: 2px;"
                    class="fa-solid text-xl fa-info-circle text-gray-700 rounded-full bg-white text-blue-500 mr-1 h-fit"
                ></i>
            </div>
        </div>
    `,
    bindings: {
        node: "<",
        indent: "<",
        onSelect: "&",
        onSelectOnly: "&",
        onShowInfo: "&",
    },
    controller: [
        "$rootScope",
        "$scope",
        function ($rootScope, $scope) {
            let $ctrl = this

            $ctrl.$onInit = () => {
                function sort(nodes) {
                    return collatorSort(nodes, "title", $rootScope.lang)
                }
                $ctrl.sortedCorpora = sort($ctrl.node.corpora)
                $ctrl.sortedFolders = sort($ctrl.node.subFolders)
            }

            $ctrl.toggleFolderVisibility = (folder) => {
                folder.extended = !folder.extended
            }

            $ctrl.toggleFolderSelection = (e, folder) => {
                if (folder["limited_access"]) {
                    folder.extended = !folder.extended
                    return
                }

                const corporaIds = treeUtil.getAllCorpora(folder)
                if (selectOnly(e)) {
                    $ctrl.selectOnly(corporaIds)
                } else {
                    const selectStatus = !["all", "some"].includes(folder.selected)
                    for (const corpusId of corporaIds) {
                        settings.corpora[corpusId].selected = selectStatus
                    }
                    $ctrl.onChildSelect()
                }
            }

            $ctrl.toggleCorpusSelection = (e, corpus) => {
                if (!corpus.userHasAccess) {
                    return
                }

                if (selectOnly(e)) {
                    $ctrl.selectOnly([corpus.id])
                } else {
                    corpus.selected = !corpus.selected
                    $ctrl.onChildSelect()
                }
            }

            function selectOnly(e) {
                const isLinux = window.navigator.userAgent.indexOf("Linux") !== -1
                return (!isLinux && e.altKey) || (isLinux && e.ctrlKey)
            }

            $ctrl.onChildSelect = function () {
                $ctrl.onSelect()
            }

            $ctrl.selectOnly = function (corporaIds) {
                $ctrl.onSelectOnly({ corporaIds })
            }

            $ctrl.showInfo = (e, node) => {
                e.stopPropagation()
                $ctrl.onShowInfo({ node })
            }

            // this one is needed for passing the node back to the corpus chooser component
            $ctrl.onShowInfoLocal = (node) => {
                $ctrl.onShowInfo({ node })
            }
        },
    ],
})
