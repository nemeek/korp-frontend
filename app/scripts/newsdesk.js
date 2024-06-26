/** @format */
// SB-newsdesk 1.0b
// Requirements: JQuery, JQuery.ui.position, trust filter, loc filter, Font Awesome
import _ from "lodash"
import Yaml from "js-yaml"
import moment from "moment"
import settings from "@/settings"
import { safeApply } from "@/util"

angular.module("newsdesk", []).directive("newsDesk", [
    "$rootElement",
    "$location",
    ($rootElement, $location) => ({
        template: `
            <div>
                <div ng-if="shouldUseThis" class="newsdesk-opener" 
                     ng-click="togglePopover($event)" 
                     ng-class="{'newsdesk-new-news': numNewNews != 0, 'newsdesk-no-new-news' : numNewNews == 0}">
                    <i class="fa-solid fa-bell newsdesk-bell"></i>
                    <div class="newsdesk-arrow-box">
                        <span>{{numNewNews}}</span>
                    </div>&nbsp;
                </div>
                <div class="popover newsdesk-popover" ng-click="onPopoverClick($event)" to-body>
                    <div class="arrow"></div>
                    <h2 class="popover-title">{{header | loc:$root.lang}}<span style="float:right;cursor:pointer" ng-click="popHide()">×</span></h2>
                    <div class="newsdesk-around-items">
                        <div class="newsdesk-news-item" ng-repeat="item in newsitems" 
                            ng-class="{'newsdesk-new-news-item': (item.created > lastChecked)}">
                            <h4>{{item.title | locObj}}</h4>
                            <span class="newsdesk-item-date">{{item.created}}</span>
                            <div ng-bind-html="item.body | locObj | trust"></div>
                        </div>
                    </div>
                </div>
        </div>`,
        restrict: "EA",
        replace: true,
        scope: { header: "=", storage: "=" },
        link(scope, elem, attr) {
            const s = scope
            s.shouldUseThis = settings["news_url"] != null

            if (!s.shouldUseThis) {
                return
            }

            s.onPopoverClick = (event) => event.stopPropagation()

            s.newsitems = []
            function initData() {
                s.lastChecked = localStorage.getItem(s.storage)
                // If visitor hasn't been here before, fall back to marking items since one year ago as unread.
                if (!s.lastChecked) {
                    const d = new Date()
                    d.setFullYear(d.getFullYear() - 1)
                    s.lastChecked = d.toISOString().slice(0, 10)
                }

                $.ajax({
                    type: "GET",
                    url: settings["news_url"],
                    async: false,
                    success(feedYaml) {
                        const items = Yaml.load(feedYaml)
                        // Hide expired items.
                        const currentDate = new Date().toISOString().slice(0, 10)
                        s.newsitems = items.filter((item) => !item.expires || item.expires >= currentDate)
                        // Stringify dates.
                        s.newsitems.forEach((item) => (item.created = moment(item.created).format("YYYY-MM-DD")))

                        // Count unread items.
                        const n = items.filter((item) => item.created > s.lastChecked).length
                        safeApply(s, () => (s.numNewNews = n))
                    },

                    error(e) {
                        console.log("error, couldn't fetch news", e.message)
                    },
                })
            }

            s.numNewNews = 0
            initData()

            s.togglePopover = function (event) {
                if (s.isPopoverVisible) {
                    s.popHide()
                } else {
                    s.popShow()
                    s.numNewNews = 0
                }
                event.preventDefault()
                event.stopPropagation()
            }

            const popover = $(".newsdesk-popover")
            s.isPopoverVisible = false

            const handleEscape = function (event) {
                if (event.which === 27) {
                    s.popHide()
                    return false
                }
            }

            s.popShow = function () {
                s.isPopoverVisible = true

                popover.show().focus().position({
                    my: "right top",
                    at: "right-10 top+10",
                    of: window,
                })
                $rootElement.on("keydown", handleEscape)
                $rootElement.on("click", s.popHide)

                // Remember the date of the newest item, so any future items can be marked as unread.
                localStorage.setItem(s.storage, s.newsitems[0].created)
            }

            s.popHide = function () {
                s.isPopoverVisible = false
                popover.hide()
                $rootElement.off("keydown", handleEscape)
                $rootElement.off("click", s.popHide)
            }
        },
    }),
])
