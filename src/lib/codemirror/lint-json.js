import { CodeMirror } from 'vue-codemirror'
import jsonLint from 'json-lint'
require('codemirror/mode/javascript/javascript')
require('codemirror/addon/lint/lint.js')
require('codemirror/addon/lint/lint.css')

CodeMirror.registerHelper('lint', 'json', text => {
  const lint = jsonLint(text, {})
  if (lint.error) {
    return [{
      from: CodeMirror.Pos(lint.line - 1, lint.character - 1),
      to: CodeMirror.Pos(lint.line - 1, lint.character),
      message: lint.error
    }]
  } else {
    return []
  }
})
