"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.className=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),ClassNameUtils={join:(...t)=>{let e="";return t.forEach((t=>{string_utils_1.default.isNullOrEmpty(t)||(e.length>0&&(e+=" "),e+=t)})),e},hAlign:(t="left")=>"center"===t?"bh-h-c":"right"===t?"bh-h-r":"bh-h-l",vAlign:(t="top")=>"middle"===t?"bh-v-m":"bottom"===t?"bh-v-b":"bh-v-t",direction:(t="vertical")=>"vertical"===t?"bh-v":"bh-h",fill:t=>t?"bh-fill":"",reverse:t=>t?"bh-reverse":"",wrap:t=>t?"bh-wrap":"bh-nowrap",fitToOuter:t=>"fill"===t?"bh-fto-fill":"ffx"===t?"bh-fto-fx":"ffy"===t?"bh-fto-fy":""};exports.default=ClassNameUtils;const className=(...t)=>ClassNameUtils.join(...t);exports.className=className;