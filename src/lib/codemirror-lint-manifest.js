import { CodeMirror } from 'vue-codemirror'
import { Validator } from 'jsonschema'
import schema from './manifest-schema'
import jsonLint from 'json-lint'
require('../../node_modules/codemirror/mode/javascript/javascript')
require('../../node_modules/codemirror/addon/lint/lint.js')
require('../../node_modules/codemirror/addon/lint/lint.css')

const validator = new Validator()
const tabSize = 2
const prefix = 'instance.'

CodeMirror.registerHelper('lint', 'json', text => {
  const lint = jsonLint(text, {})
  if (lint.error) {
    return [{
      from: CodeMirror.Pos(lint.line - 1, lint.character - 1),
      to: CodeMirror.Pos(lint.line - 1, lint.character),
      message: lint.error
    }]
  } else {
    const { errors } = validator.validate(JSON.parse(text), schema)
    const messages = []
    if (errors) {
      errors.forEach(error => {
        messages.push(generateErrorMessage(error, text))
      })

      return messages
    }
  }

  return []
})

function generateErrorMessage (error, text) {
  if (error.name === 'required') {
    return {
      from: CodeMirror.Pos(0, 1),
      to: CodeMirror.Pos(0, 1),
      message: removePrefix(error.stack)
    }
  } else {
    const position = getLinePosition(error, text)
    return {
      from: CodeMirror.Pos(position.from.line, position.from.char),
      to: CodeMirror.Pos(position.to.line, position.to.char),
      message: removePrefix(error.stack)
    }
  }
}

function getLinePosition (error, text) {
  const propertyName = error.property.substr('instance.'.length)
  const pattern = new RegExp('(\\s*"' + propertyName + '"\\s*:\\s*)(.*)\\s*,\\s*$')
  const lines = text.split('\n')
  const lineIndex = lines.findIndex(line => line.includes(propertyName))
  const line = lines[lineIndex].replace('\t', ' '.repeat(tabSize))
  const matches = line.match(pattern)
  const fromChar = matches[1].length - 1
  const toChar = fromChar + matches[2].length

  return {
    from: {
      line: lineIndex,
      char: fromChar
    },
    to: {
      line: lineIndex,
      char: toChar
    }
  }
}

function removePrefix (str) {
  return str.replace(prefix, '')
}
