/** @format */
import angular from "angular"
import { html } from "@/util"
const korpFailImg = require("../../img/korp_fail.svg")

angular.module("korpApp").component("korpError", {
    template: html`
        <div>
            <object class="korp_fail inline-block" type="image/svg+xml" data="${korpFailImg}">
                <img class="korp_fail" src="${korpFailImg}" />
            </object>
            <div class="fail_text inline-block">{{'fail_text' | loc:$root.lang}}</div>
        </div>
    `,
})
