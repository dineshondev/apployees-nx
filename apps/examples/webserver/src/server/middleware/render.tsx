/*******************************************************************************
 * © Apployees Inc., 2019
 * All Rights Reserved.
 ******************************************************************************/
import escapeStringRegexp from "escape-string-regexp";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../../app/App";

const renderMiddleware = () => (req, res) => {
  let html = req.html;

  // The following will render the App on the server side, and rehydrate on
  // the client side. If you do not want server-side rendering, then simply
  // remove everything in between the SERVER-SIDE-RENDERING comments
  // and uncomment everything between CLIENT-SIDE-ONLY-RENDERING comments

  // ------- SERVER-SIDE-RENDERING -------
  const htmlContent = ReactDOMServer.renderToString(<App />);
  // ------- /SERVER-SIDE-RENDERING -------

  // ------- CLIENT-SIDE-ONLY-RENDERING -------
  // const htmlContent = "";
  // ------- CLIENT-SIDE-ONLY-RENDERING -------

  html = html.replace(
    new RegExp(escapeStringRegexp(`<div id="root"></div>`), "g"),
    `<div id="root">${htmlContent}</div>`,
  );

  res.send(html);
};

export default renderMiddleware;
