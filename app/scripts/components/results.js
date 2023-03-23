/** @format */
let html = String.raw
export const resultsComponent = {
    template: html`
        <div>
            <div id="results-wrapper" ng-show="$ctrl.hasResult()">
                <div class="flex" id="columns" ng-class="{sidebar_visible : $ctrl.sidebarVisible}">
                    <div class="overflow-auto grow" id="left-column">
                        <uib-tabset class="tabbable result_tabs" tab-hash="result_tab" active="activeTab">
                            <uib-tab kwic-ctrl index="0" select="onentry()" deselect="onexit()">
                                <uib-tab-heading ng-class="{not_loading: progress > 99, loading : loading}"
                                    >KWIC<tab-preloader
                                        ng-if="loading"
                                        value="progress"
                                        spinner="countCorpora() < 2"
                                    ></tab-preloader>
                                </uib-tab-heading>
                                <div class="results-kwic" ng-class="{reading_mode : reading_mode, loading: loading}">
                                    <korp-error ng-if="error"></korp-error>
                                    <kwic
                                        ng-if="!error"
                                        aborted="aborted"
                                        loading="loading"
                                        active="active"
                                        hits-display="hits_display"
                                        hits="hits"
                                        kwic-input="kwic"
                                        corpus-hits="corpusHits"
                                        is-reading="is_reading"
                                        page="page"
                                        page-event="pageChange"
                                        context-change-event="toggleReading"
                                        hits-per-page="hitsPerPage"
                                        prev-params="proxy.prevParams"
                                        prev-request="proxy.prevRequest"
                                        corpus-order="corpusOrder"
                                    ></kwic>
                                </div>
                            </uib-tab>
                            <uib-tab
                                stats-result-ctrl
                                ng-if="$root._settings.statistics != false"
                                select="onentry()"
                                deselect="onexit()"
                                index="2"
                            >
                                <uib-tab-heading ng-class="{not_loading: progress > 99, loading : loading}"
                                    >{{'statistics' | loc:lang}}
                                    <tab-preloader
                                        ng-if="loading"
                                        value="progress"
                                        spinner="countCorpora() < 2"
                                    ></tab-preloader>
                                </uib-tab-heading>
                                <korp-error ng-if="error"></korp-error>
                                <statistics
                                    aborted="aborted"
                                    activate="activate"
                                    columns="columns"
                                    data="data"
                                    error="error"
                                    grid-data="gridData"
                                    has-result="hasResult"
                                    in-order="inOrder"
                                    loading="loading"
                                    no-hits="no_hits"
                                    prev-params="proxy.prevParams"
                                    search-params="searchParams"
                                    show-statistics="showStatistics"
                                ></statistics>
                            </uib-tab>
                            <uib-tab
                                ng-if="$root._settings['word_picture'] != false"
                                wordpic-ctrl
                                index="3"
                                select="onentry()"
                                deselect="onexit()"
                            >
                                <uib-tab-heading ng-class="{not_loading: progress > 99, loading : loading}">
                                    {{'word_picture' | loc:lang}}
                                    <tab-preloader
                                        ng-if="loading"
                                        value="progress"
                                        spinner="countCorpora() < 2"
                                    ></tab-preloader>
                                </uib-tab-heading>
                                <div ng-if="!error">
                                    <word-picture
                                        data="data"
                                        word-pic="wordPic"
                                        activate="activate"
                                        loading="loading"
                                        has-data="hasData"
                                        aborted="aborted"
                                        hit-settings="hitSettings"
                                        settings="settings"
                                        no-hits="noHits"
                                    ></word-picture>
                                </div>
                                <korp-error ng-if="error"></korp-error>
                            </uib-tab>
                            <kwic-tabs tabs="$root.kwicTabs"></kwic-tabs>
                            <graph-tabs tabs="$root.graphTabs"></graph-tabs>
                            <compare-tabs tabs="$root.compareTabs"></compare-tabs>
                            <map-tabs tabs="$root.mapTabs"></map-tabs>
                            <text-tabs tabs="$root.textTabs"></text-tabs>
                        </uib-tabset>
                        <a id="json-link" ng-href="{{$root.jsonUrl}}" ng-show="$root.jsonUrl" target="_blank">
                            <img src="img/json.png" />
                        </a>
                    </div>
                    <sidebar
                        class="sidebar shrink-0 ml-2"
                        on-show="$ctrl.onSidebarShow()"
                        on-hide="$ctrl.onSidebarHide()"
                        lang="$root.lang"
                    >
                    </sidebar>
                </div>
            </div>
            <!-- mode description -->
            <div
                ng-if="!$ctrl.hasResult() && $ctrl.showDescription"
                style="margin: 0 auto; width: 650px; margin-top: 70px"
                ng-bind-html="$root._settings['description'] | locObj:lang | trust"
            ></div>
        </div>
    `,
    bindings: {},
    controller: [
        "$rootScope",
        "searches",
        function ($rootScope, searches) {
            const $ctrl = this
            $ctrl.searches = searches
            $ctrl.onSidebarShow = () => ($ctrl.sidebarVisible = true)
            $ctrl.onSidebarHide = () => ($ctrl.sidebarVisible = false)

            $ctrl.hasResult = () =>
                $ctrl.searches.activeSearch ||
                $rootScope.compareTabs.length ||
                $rootScope.graphTabs.length ||
                $rootScope.mapTabs.length

            $ctrl.showDescription = false

            // Don't show the mode description until the inital corpora has been selected, to avoid text behind any modals
            $rootScope.$on(
                "initialcorpuschooserchange",
                () => ($ctrl.showDescription = settings["description"] != undefined)
            )
        },
    ],
}