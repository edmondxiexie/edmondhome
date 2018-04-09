import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      page,
      pages,
      onKeyDown,
      onChangePage,
      onNextPage,
      onPreviousPage,
      onFirstPage,
      onLastPage
    } = this.props;

    let disablePrevious = String(page) === "1" ? "disabled-link" : "";
    let disableFirst = String(page) === "1" ? "disabled-link" : "";
    let disableNext = String(page) === String(pages) ? "disabled-link" : "";
    let disableLast = String(page) === String(pages) ? "disabled-link" : "";

    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a
              className={`page-link ${disableFirst}`}
              onClick={e => {
                onFirstPage(e);
              }}
            >
              First Page
            </a>
          </li>
          <li className="page-item">
            <a
              className={`page-link ${disablePrevious}`}
              aria-label="Previous"
              onClick={e => {
                onPreviousPage(e);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <input
              type="text"
              name="page"
              value={page}
              onChange={onChangePage}
              onKeyDown={onKeyDown}
            />
          </li>
          <li className="page-item">
            <a
              className={`page-link ${disableNext}`}
              aria-label="Next"
              onClick={e => {
                onNextPage(e);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
          <li className="page-item">
            <a
              className={`page-link ${disableLast}`}
              onClick={e => {
                onLastPage(e);
              }}
            >
              Last Page
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
