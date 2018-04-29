# plover

An approach to using Vega in R Markdown.

## Demo

[netbek.github.io/plover](https://netbek.github.io/plover)

## Installation

1. Install system dependencies:

    ```
    sudo apt-get install build-essential curl g++ gcc python-dev
    ```

2. Install NVM and Node 8.x:

    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    source ~/.bashrc
    nvm install v8.9.4
    nvm alias default v8.9.4
    ```

3. Install local Node dependencies:

    ```
    cd /path/to/plover
    npm install
    ```

4. Install R packages:

    ```
    install.packages(c("jsonlite", "purrr", "rmarkdown"))
    ```

## Usage

To get started, open `/vega/index.Rmd` in RStudio.

A Vega-Lite spec can be supplied in long-form, or generated with the To-Vega library, as done in this example.

A global theme is stored in `/vega/theme.json`. Remember to knit the document after making changes.

## Resources

* [To-Vega: methods for generating Vega-Lite specifications](https://github.com/gjmcn/to-vega/blob/master/README.md#methods)
* [Vega-Lite: specifications](https://vega.github.io/vega-lite/docs/spec.html)
* [Vega-Lite: theme configuration](https://vega.github.io/vega-lite/docs/config.html)

## License

Copyright (c) 2018 Hein Bekker. Licensed under the GNU Affero General Public License, version 3.
