'use babel';

import InStateView from './in-state-view';
import {
    CompositeDisposable
} from 'atom';


export default {

    inStateView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.inStateView = new InStateView(state.inStateViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.inStateView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'in-state:create': () => this.create(),
            'in-state:create_string': () => this.create_string()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.inStateView.destroy();
    },

    serialize() {
        return {
            inStateViewState: this.inStateView.serialize()
        };
    },

    create() {
        console.log('Created an in Statement for you!')
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let text = editor.getSelectedText()
            let lines = text.split('\n')

            let line_lenght = 1
            let result = "("
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] == "") {
                    continue
                }
                line_lenght += lines[i].toString().length + 1
                if (line_lenght >= 100) {
                    result += "\n"
                    line_lenght = lines[i].toString().length + 1
                }

                result += lines[i]
                result += ","
            }
            // remove last character (comma)
            result = result.slice(0, -1)
            result += ")"
            editor.insertText(result)
        }
    },

    create_string() {
        console.log('Created an in Statement for you! (As String Value)')
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let text = editor.getSelectedText()
            let lines = text.split('\n')

            let line_lenght = 1
            let result = "("
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] == "") {
                    continue
                }
                line_lenght += lines[i].toString().length + 1
                if (line_lenght >= 100) {
                    result += "\n"
                    line_lenght = lines[i].toString().length + 1
                }

                result += "'" + lines[i] + "'"
                result += ","
            }
            // remove last character (comma)
            result = result.slice(0, -1)
            result += ")"
            editor.insertText(result)
        }
    }
};
