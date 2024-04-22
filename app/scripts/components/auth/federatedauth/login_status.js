/** @format */
import statemachine from "@/statemachine"
import * as authenticationProxy from "../auth"
import { html } from "@/util"

export const loginStatusComponent = {
    template: html`
        <div class="link" id="log_out" ng-click="$ctrl.logout()" ng-if="$ctrl.loggedIn">
            <span>{{ 'log_out' | loc:$root.lang }}</span>
            <span>{{ $ctrl.username }}</span>
        </div>
        <div id="login">
            <a ng-click="$ctrl.doLogin()" ng-show="!$ctrl.loggedIn">{{'log_in' | loc:$root.lang}}</a>
        </div>
    `,
    bindings: {},
    controller: [
        "$timeout",
        function ($timeout) {
            const $ctrl = this

            $ctrl.loggedIn = authenticationProxy.isLoggedIn()

            if ($ctrl.loggedIn) {
                $ctrl.username = authenticationProxy.getUsername()
            }

            $ctrl.logout = function () {
                statemachine.send("LOGOUT")
                $ctrl.loggedIn = false
            }

            statemachine.listen("login", () => {
                $timeout(() => {
                    $ctrl.loggedIn = true
                    $ctrl.username = authenticationProxy.getUsername()
                })
            })

            statemachine.listen("login_needed", function (event) {
                $ctrl.doLogin(event.loginNeededFor)
            })

            $ctrl.doLogin = (loginNeededFor) => {
                // TODO here we must get the URL so that the state can be restored that way
                authenticationProxy.login()
            }
        },
    ],
}
