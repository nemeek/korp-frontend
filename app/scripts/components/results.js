/** @format */
let html = String.raw
export const resultsComponent = {
    template: html`
        <div
            id="results-wrapper"
            ng-show="$ctrl.searches.activeSearch || $root.compareTabs.length || $root.graphTabs.length || $root.mapTabs.length"
        >
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
                                    data="data"
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
                            ng-if="_settings.statistics != false"
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
                            <div ng-click="onStatsClick($event)" ng-show="!error">
                                <div ng-if="!inOrder && !hasResult">{{'stats_not_in_order_warn' | loc:lang}}</div>
                                <div ng-if="!showStatistics">
                                    {{'stats_warn' | loc:lang}}
                                    <div>
                                        <button class="btn btn-sm btn-default activate_word_pic" ng-click="activate()">
                                            {{'word_pic_warn_btn' | loc:lang}}
                                        </button>
                                    </div>
                                </div>
                                <div ng-if="showStatistics && !hasResult && inOrder">
                                    <div>
                                        <button class="btn btn-sm btn-default activate_word_pic" ng-click="activate()">
                                            {{'update_btn' | loc:lang}}
                                        </button>
                                    </div>
                                </div>
                                <warning ng-if="showStatistics && no_hits"> {{"no_stats_results" | loc:lang}} </warning>
                                <warning ng-if="showStatistics && aborted && !loading">
                                    {{'search_aborted' | loc:lang}}
                                </warning>
                                <div ng-show="showStatistics && hasResult">
                                    <div class="stats_header">
                                        <button
                                            class="btn btn-sm btn-default show-graph-btn"
                                            ng-click="onGraphClick()"
                                            ng-class="{disabled: !graphEnabled}"
                                            uib-tooltip="{{'material_warn' | loc:lang}}"
                                            tooltip-placement="right"
                                            tooltip-enable="!graphEnabled"
                                        >
                                            <span class="graph_btn_icon">
                                                <svg
                                                    height="24"
                                                    version="1.1"
                                                    width="33"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    style="overflow: hidden; position: relative"
                                                >
                                                    <desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)">
                                                        Created with Raphaël 2.1.0
                                                    </desc>
                                                    <defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"></defs>
                                                    <path
                                                        fill="#666666"
                                                        stroke="none"
                                                        d="M3.625,25.062C3.086,24.947000000000003,2.74,24.416,2.855,23.875L2.855,23.875L6.51,6.584L8.777,15.843L10.7,10.655000000000001L14.280999999999999,14.396L18.163999999999998,1.293000000000001L21.098,13.027000000000001L23.058,11.518L28.329,23.258000000000003C28.555,23.762000000000004,28.329,24.353,27.824,24.579000000000004L27.824,24.579000000000004C27.319000000000003,24.806000000000004,26.728,24.579000000000004,26.502000000000002,24.075000000000003L26.502000000000002,24.075000000000003L22.272000000000002,14.647000000000002L19.898000000000003,16.473000000000003L18.002000000000002,8.877000000000002L15.219000000000003,18.270000000000003L11.465000000000003,14.346000000000004L8.386,22.66L6.654999999999999,15.577L4.811999999999999,24.288C4.710999999999999,24.76,4.297,25.082,3.8329999999999993,25.082L3.8329999999999993,25.082C3.765,25.083,3.695,25.076,3.625,25.062L3.625,25.062Z"
                                                        transform="matrix(0.6,0,0,0.6,6.2499,5.275)"
                                                        stroke-width="1.6666666666666667"
                                                        style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
                                                    ></path>
                                                </svg>
                                            </span>
                                            {{'show_diagram' | loc:lang}}
                                        </button>
                                        <div
                                            class="map-settings-container"
                                            uib-dropdown
                                            auto-close="outsideClick"
                                            ng-show="mapEnabled"
                                        >
                                            <button class="btn btn-sm btn-default" uib-dropdown-toggle>
                                                {{'show_map' | loc:lang}}<span class="caret"></span>
                                            </button>
                                            <div uib-dropdown-menu>
                                                <h3 class="map-settings-title">{{'select_attribute' | loc:lang}}</h3>
                                                <ul ng-if="mapAttributes.length != 0">
                                                    <li
                                                        ng-repeat="attr in mapAttributes"
                                                        ng-class="attr.selected ? 'selected':''"
                                                        ng-click="mapToggleSelected($index, $event)"
                                                    >
                                                        <span class="checked">✔</span>
                                                        <span>{{attr.label | loc:lang}}</span>
                                                    </li>
                                                </ul>
                                                <span class="empty-attribute-list" ng-show="mapAttributes.length == 0">
                                                    {{ 'no_geo_info' | loc:lang}}
                                                </span>
                                                <div class="btn-container">
                                                    <button
                                                        class="btn btn-sm btn-primary"
                                                        ng-disabled="mapAttributes.length == 0"
                                                        ng-click="showMap()"
                                                    >
                                                        {{'show_map' | loc:lang}}
                                                    </button>
                                                </div>
                                            </div>
                                            <span class="ml-3 err_msg" ng-if="noRowsError">
                                                {{'no_row_selected_map' | loc:lang}}
                                            </span>
                                        </div>
                                        <div id="showBarPlot"></div>
                                    </div>
                                    <div ng-if="!loading" style="margin-bottom: 5px">
                                        {{'total_rows' | loc:lang}} {{totalNumberOfRows}}
                                    </div>
                                    <div id="myGrid"></div>
                                    <div id="exportStatsSection">
                                        <br /><br />
                                        <select id="kindOfData">
                                            <option value="relative" rel="localize[statstable_relfigures]">
                                                Relativa tal
                                            </option>
                                            <option value="absolute" rel="localize[statstable_absfigures]">
                                                Absoluta tal
                                            </option>
                                        </select>
                                        <select id="kindOfFormat">
                                            <option value="csv" rel="localize[statstable_exp_csv]">
                                                CSV (kommaseparerade värden)
                                            </option>
                                            <option value="tsv" rel="localize[statstable_exp_tsv]">
                                                TSV (tabseparerade värden)
                                            </option>
                                        </select>
                                        <a id="generateExportButton" ng-click="generateExport()">
                                            <button class="btn btn-sm btn-default">
                                                {{'statstable_gen_export' | loc:lang}}
                                            </button>
                                        </a>
                                        <a class="btn btn-sm btn-default" id="exportButton">
                                            {{'statstable_export' | loc:lang}}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </uib-tab>
                        <uib-tab
                            ng-if="_settings['word_picture'] != false"
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
                    <a id="json-link" ng-href="{{jsonUrl}}" ng-show="jsonUrl" target="_blank">
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
    `,
    bindings: {},
    controller: [
        "searches",
        function (searches) {
            const $ctrl = this
            $ctrl.searches = searches
            $ctrl.onSidebarShow = () => ($ctrl.sidebarVisible = true)
            $ctrl.onSidebarHide = () => ($ctrl.sidebarVisible = false)
        },
    ],
}
