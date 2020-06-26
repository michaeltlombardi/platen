// TODO: Rolltable, Alerts for required variables
// TODO: Rolltable, Hide elements until data is ready
// TODO: Rolltable, Prop Types
// TODO: Rolltable, Refactor build table script

import React, { Component } from "react"
// import { MDXProvider } from "@mdx-js/react"

import CSVQuery from "./CSVQuery/CSVQuery"
import CSVUpload from "./CSVUpload/CSVUpload"
// import CSVTable from "../CSVTable/CSVTable"

// import Notes from "./Notes.mdx"

import {
  FaBug,
  FaSprayCan,
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaDiceD20,
} from "react-icons/fa"

export default class Rolltable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      debug: false,
      fileData: false,
      result: false,
    }

    this.updateData = this.updateData.bind(this)
  }

  toggleTableCollapse = () => {
    let collapse = !this.state.collapse
    this.setState({ collapse })
  }
  toggleDebug = () => {
    let debug = !this.state.debug
    this.setState({ debug })
  }
  updateData = ({ data }) => {
    this.setState({ fileData: data })
  }

  render() {
    const { name, caption, src } = this.props
    const tableName = name.toLowerCase().replace(/\s+/g, "-")

    return (
      <>
        <div
          id={`rolltable-${tableName}`}
          className="relative w-full block mt-8 border-2 border-tertiary-200 bg-white rounded shadow-md overflow-hidden"
        >
          <header>
            <div className="w-full flex justify-center items-stretch pt-4 px-4">
              <div className="flex-auto">
                <h3>{name}</h3>

                <h4 className="italic">{caption && caption}</h4>
              </div>
              <div>
                <ul className="flex-initial flex flex-wrap justify-center items-start pt-1 pr-1 -mb-1 -ml-1">
                  <li className="mb-1 ml-1">
                    <button
                      className="btn-action-outline text-xs flex justify-center items-center rounded-full"
                      id={`rolltable-${tableName}-debug`}
                      onClick={this.toggleDebug}
                    >
                      <span className="sr-only">
                        {this.state.debug ? "Open" : "Hide"} Debugger
                      </span>
                      {this.state.debug ? <FaSprayCan /> : <FaBug />}
                    </button>
                  </li>
                  <li className="mb-1 ml-1">
                    {this.state.fileData && (
                      <button
                        className="btn-action-outline text-xs flex justify-center items-center rounded-full"
                        id={`rolltable-${tableName}-collapser`}
                        onClick={this.toggleTableCollapse}
                      >
                        <span className="sr-only">
                          {this.state.collapse ? "Open" : "Hide"} Module
                        </span>
                        {this.state.collapse ? (
                          <FaExpandArrowsAlt />
                        ) : (
                          <FaCompressArrowsAlt />
                        )}
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {this.state.debug && (
              <div className="w-full px-4 mt-4">
                <h3>Component State</h3>
                <pre>{JSON.stringify(this.state, null, 4)}</pre>
              </div>
            )}

            {/* <div className="mw-full mx-2 p-2 text-xs list-disc bg-yellow-200 rounded">
              <MDXProvider>
                <Notes />
              </MDXProvider>
            </div> */}

            <CSVQuery
              src={src}
              table={tableName}
              debug={this.state.debug}
              updateData={this.updateData}
            />
          </header>

          {/* TODO: Return results */}
          <div id={`result-${tableName}`} className="mt-4">
            <p className="block py-4 px-8 font-bold text-2xl text-center">
              {this.state.result ? (
                this.state.result
              ) : (
                <span className="p-4 text-sm text-gray-900 bg-yellow-200">
                  Cannot generate results. Please Add or Upload a CSV.
                </span>
              )}
            </p>
          </div>

          <menu
            type="toolbar"
            label="Rolltable Controls"
            className="flex justify-center p-0 m-0 mt-4 bg-tertiary-200"
          >
            <ul className="flex flex-wrap justify-start align-center p-0 m-0 pt-2 pr-2">
              <li className="mb-2 ml-2">
                <CSVUpload
                  table={tableName}
                  debug={this.state.debug}
                  updateData={this.updateData}
                />
              </li>

              {this.state.fileData && (
                <li className="mb-2 ml-2">
                  <button
                    id={`rolltable-${tableName}-collapser`}
                    className="flex-1 btn-action"
                    style={{ flexBasis: "200px" }}
                    // onClick={() => getRandomEntries(tableName)}
                    // onClick={toggleRandomize}
                  >
                    <span className="flex justify-center items-center">
                      <FaDiceD20 className="mr-1" /> Randomize
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </menu>

          {this.state.collapse && (
            <div className="pt-2 w-full">
              <p className="px-4 text-center text-xs italic">
                <strong>Note:</strong> Click on any header to reroll for that
                column.
              </p>

              <div className="p-4 bg-red-200">
                "Table Goes Here"
                {/* <BuildTable name={tableName} data="data" /> */}
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}
