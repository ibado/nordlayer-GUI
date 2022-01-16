/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'nordlayer-GUI';

const { GObject, St } = imports.gi;

const getText = imports.gettext.domain(GETTEXT_DOMAIN).gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, getText('Nordlayer GUI'));

        this.add_child(new St.Icon({
            style_class: 'nordlayer-icon',
        }));
        this.addMenuItems(); 
    }

    addMenuItems() {
        const items = {
            "United States": "us",
            "Argentina": "ar",
            "Brazil": "br"
        };

        const click = (code) => { Main.notify(getText('You clicked ' + items[code])) };

        Object.keys(items).forEach((item) => {
            let menuItem = new PopupMenu.PopupMenuItem(getText(item));
            menuItem.connect('activate', () => click(item));
            this.menu.addMenuItem(menuItem);
        });
        
    }
}

const IndicatorClass = GObject.registerClass(Indicator);

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new IndicatorClass();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
