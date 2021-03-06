popoto = function() {
    var a = {
        version: "1.0",
        start: function(b) {
            a.logger.info("Popoto " + a.version + " start on label '" + b + "'.");
            a.graph.mainLabel = b;
            "undefined" == typeof a.rest.CYPHER_URL ? a.logger.error("popoto.rest.CYPHER_URL is not set but this property is required.") : (a.checkHtmlComponents(), a.taxonomy.isActive && a.taxonomy.createTaxonomyPanel(), a.graph.isActive && (a.graph.createGraphArea(), a.graph.createForceLayout(), a.graph.addRootNode(b)), a.queryviewer.isActive && a.queryviewer.createQueryArea(), a.cypherviewer.isActive &&
                a.cypherviewer.createQueryArea(), a.update())
        },
        checkHtmlComponents: function() {
            var b = d3.select("#" + a.graph.containerId),
                c = d3.select("#" + a.taxonomy.containerId),
                d = d3.select("#" + a.queryviewer.containerId),
                e = d3.select("#" + a.cypherviewer.containerId),
                f = d3.select("#" + a.result.containerId);
            b.empty() ? (a.logger.debug("The page doesn't contain a container with ID = \"" + a.graph.containerId + '" no graph area will be generated. This ID is defined in popoto.graph.containerId property.'), a.graph.isActive = !1) : a.graph.isActive = !0;
            c.empty() ? (a.logger.debug("The page doesn't contain a container with ID = \"" + a.taxonomy.containerId + '" no taxonomy filter will be generated. This ID is defined in popoto.taxonomy.containerId property.'), a.taxonomy.isActive = !1) : a.taxonomy.isActive = !0;
            d.empty() ? (a.logger.debug("The page doesn't contain a container with ID = \"" + a.queryviewer.containerId + '" no query viewer will be generated. This ID is defined in popoto.queryviewer.containerId property.'), a.queryviewer.isActive = !1) : a.queryviewer.isActive = !0;
            e.empty() ? (a.logger.debug("The page doesn't contain a container with ID = \"" + a.cypherviewer.containerId + '" no cypher query viewer will be generated. This ID is defined in popoto.cypherviewer.containerId property.'), a.cypherviewer.isActive = !1) : a.cypherviewer.isActive = !0;
            f.empty() ? (a.logger.debug("The page doesn't contain a container with ID = \"" + a.result.containerId + '" no result area will be generated. This ID is defined in popoto.result.containerId property.'), a.result.isActive = !1) : a.result.isActive = !0
        },
        update: function() {
            a.updateGraph();
            a.queryviewer.isActive && a.queryviewer.updateQuery();
            a.cypherviewer.isActive && a.cypherviewer.updateQuery();
            (a.result.isActive || 0 < a.result.resultListeners.length || 0 < a.result.resultCountListeners.length) && a.result.updateResults()
        },
        updateGraph: function() {
            a.graph.isActive && (a.graph.force.start(), a.graph.link.updateLinks(), a.graph.node.updateNodes())
        },
        rest: {}
    };
    a.rest.CYPHER_URL = "http://localhost:7474/db/data/transaction/commit";
    a.rest.post = function(b) {
        b = JSON.stringify(b);
        a.logger.info("REST POST:" + b);
        return $.ajax({
            type: "POST",
            beforeSend: function(b) {
                a.rest.AUTHORIZATION && b.setRequestHeader("Authorization", a.rest.AUTHORIZATION)
            },
            url: a.rest.CYPHER_URL,
            contentType: "application/json",
            data: b
        })
    };
    a.logger = {};
    a.logger.LogLevels = Object.freeze({
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        NONE: 4
    });
    a.logger.LEVEL = a.logger.LogLevels.NONE;
    a.logger.TRACE = !1;
    a.logger.log = function(b, c) {
        if (console && b >= a.logger.LEVEL) switch (a.logger.TRACE && (c = c + "\n" + Error().stack), b) {
            case a.logger.LogLevels.DEBUG:
                console.log(c);
                break;
            case a.logger.LogLevels.INFO:
                console.log(c);
                break;
            case a.logger.LogLevels.WARN:
                console.warn(c);
                break;
            case a.logger.LogLevels.ERROR:
                console.error(c)
        }
    };
    a.logger.debug = function(b) {
        a.logger.log(a.logger.LogLevels.DEBUG, b)
    };
    a.logger.info = function(b) {
        a.logger.log(a.logger.LogLevels.INFO, b)
    };
    a.logger.warn = function(b) {
        a.logger.log(a.logger.LogLevels.WARN, b)
    };
    a.logger.error = function(b) {
        a.logger.log(a.logger.LogLevels.ERROR, b)
    };
    a.taxonomy = {};
    a.taxonomy.containerId = "popoto-taxonomy";
    a.taxonomy.createTaxonomyPanel =
        function() {
            var b = d3.select("#" + a.taxonomy.containerId).append("ul"),
                c = a.taxonomy.generateTaxonomiesData(),
                b = b.selectAll(".taxo").data(c).enter().append("li").attr("id", function(a) {
                    return a.id
                }).attr("value", function(a) {
                    return a.label
                });
            b.append("span").attr("class", "ppt-taxo-tag").html("&nbsp;");
            b.append("span").attr("class", "ppt-label").text(function(b) {
                return a.provider.getTaxonomyTextValue(b.label)
            });
            b.append("span").attr("class", "ppt-count");
            b.on("click", a.taxonomy.onClick);
            a.taxonomy.addTaxonomyChildren(b);
            var d = [];
            c.forEach(function(b) {
                d.push(b);
                b.children && a.taxonomy.flattenChildren(b, d)
            });
            a.taxonomy.updateCount(d)
        };
    a.taxonomy.flattenChildren = function(b, c) {
        b.children.forEach(function(b) {
            c.push(b);
            b.children && c.concat(a.taxonomy.flattenChildren(b, c))
        })
    };
    a.taxonomy.updateCount = function(b) {
        var c = [];
        b.forEach(function(b) {
            c.push({
                statement: a.query.generateTaxonomyCountQuery(b.label)
            })
        });
        (function(b) {
            a.logger.info("Count taxonomies ==> ");
            a.rest.post({
                statements: c
            }).done(function(a) {
                for (var c = 0; c < b.length; c++) {
                    var l =
                        a.results[c].data[0].row[0];
                    d3.select("#" + b[c].id).select(".ppt-count").text(" (" + l + ")")
                }
            }).fail(function(b, c, d) {
                a.logger.error(c + ': error while accessing Neo4j server on URL:"' + a.rest.CYPHER_URL + '" defined in "popoto.rest.CYPHER_URL" property: ' + d);
                d3.select("#popoto-taxonomy").selectAll(".ppt-count").text(" (0)")
            })
        })(b)
    };
    a.taxonomy.addTaxonomyChildren = function(b) {
        b.each(function(b) {
            var d = d3.select(this),
                e = b.children;
            b.children && (b = d.append("ul").selectAll("li").data(e).enter().append("li").attr("id",
                function(a) {
                    return a.id
                }).attr("value", function(a) {
                return a.label
            }), b.append("span").attr("class", "ppt-taxo-tag").html("&nbsp;"), b.append("span").attr("class", "ppt-label").text(function(b) {
                return a.provider.getTaxonomyTextValue(b.label)
            }), b.append("span").attr("class", "ppt-count"), b.on("click", a.taxonomy.onClick), a.taxonomy.addTaxonomyChildren(b))
        })
    };
    a.taxonomy.onClick = function() {
        d3.event.stopPropagation();
        if (void 0 !== a.graph.getRootNode().count) {
            for (var b = this.attributes.value.value; 0 < a.graph.force.nodes().length;) a.graph.force.nodes().pop();
            for (; 0 < a.graph.force.links().length;) a.graph.force.links().pop();
            a.graph.node.internalLabels = {};
            a.update();
            a.graph.addRootNode(b);
            a.graph.hasGraphChanged = !0;
            a.result.hasChanged = !0;
            a.update();
            a.tools.center()
        }
    };
    a.taxonomy.generateTaxonomiesData = function() {
        var b = 0,
            c = [],
            d;
        for (d in a.provider.nodeProviders) a.provider.nodeProviders.hasOwnProperty(d) && a.provider.getProperty(d, "isSearchable") && !a.provider.nodeProviders[d].parent && c.push({
            label: d,
            id: "popoto-lbl-" + b++
        });
        c.forEach(function(c) {
            a.provider.getProvider(c.label).hasOwnProperty("children") &&
                (b = a.taxonomy.addChildrenData(c, b))
        });
        return c
    };
    a.taxonomy.addChildrenData = function(b, c) {
        b.children = [];
        a.provider.getProvider(b.label).children.forEach(function(d) {
            var e = a.provider.getProvider(d),
                f = {
                    label: d,
                    id: "popoto-lbl-" + c++
                };
            e.hasOwnProperty("children") && (c = a.taxonomy.addChildrenData(f, c));
            a.provider.getProperty(d, "isSearchable") && b.children.push(f)
        });
        return c
    };
    a.tools = {};
    a.tools.CENTER_GRAPH = !0;
    a.tools.RESET_GRAPH = !0;
    a.tools.TOGGLE_TAXONOMY = !0;
    a.tools.TOGGLE_FULL_SCREEN = !0;
    a.tools.reset = function() {
        for (; 0 <
            a.graph.force.nodes().length;) a.graph.force.nodes().pop();
        for (; 0 < a.graph.force.links().length;) a.graph.force.links().pop();
        a.graph.node.internalLabels = {};
        a.update();
        a.graph.addRootNode(a.graph.mainLabel);
        a.graph.hasGraphChanged = !0;
        a.result.hasChanged = !0;
        a.update();
        a.tools.center()
    };
    a.tools.center = function() {
        a.graph.zoom.translate([0, 0]).scale(1);
        a.graph.svg.transition().attr("transform", "translate(" + a.graph.zoom.translate() + ") scale(" + a.graph.zoom.scale() + ")")
    };
    a.tools.toggleTaxonomy = function() {
        var b =
            d3.select("#" + a.taxonomy.containerId);
        b.filter(".disabled").empty() ? b.classed("disabled", !0) : b.classed("disabled", !1)
    };
    a.tools.toggleFullScreen = function() {
        var b = document.getElementById(a.graph.containerId);
        document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen &&
            document.webkitExitFullscreen() : b.requestFullscreen ? b.requestFullscreen() : b.msRequestFullscreen ? b.msRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.webkitRequestFullscreen && b.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    };
    a.graph = {};
    a.graph.containerId = "popoto-graph";
    a.graph.hasGraphChanged = !0;
    a.graph.zoom = d3.behavior.zoom().scaleExtent([.1, 10]);
    a.graph.WHEEL_ZOOM_ENABLED = !0;
    a.graph.TOOL_TAXONOMY = "Show/hide taxonomy panel";
    a.graph.TOOL_CENTER = "Center view";
    a.graph.TOOL_FULL_SCREEN =
        "Full screen";
    a.graph.TOOL_RESET = "Reset graph";
    a.graph.Events = Object.freeze({
        NODE_ROOT_ADD: "root.node.add",
        NODE_EXPAND_RELATIONSHIP: "node.expandRelationship"
    });
    a.graph.createGraphArea = function() {
        var b = d3.select("#" + a.graph.containerId),
            c = b.append("div").attr("class", "ppt-toolbar");
        if (a.tools.RESET_GRAPH) c.append("span").attr("id", "popoto-reset-menu").attr("class", "ppt-menu reset").attr("title", a.graph.TOOL_RESET).on("click", a.tools.reset);
        if (a.taxonomy.isActive && a.tools.TOGGLE_TAXONOMY) c.append("span").attr("id",
            "popoto-taxonomy-menu").attr("class", "ppt-menu taxonomy").attr("title", a.graph.TOOL_TAXONOMY).on("click", a.tools.toggleTaxonomy);
        if (a.tools.CENTER_GRAPH) c.append("span").attr("id", "popoto-center-menu").attr("class", "ppt-menu center").attr("title", a.graph.TOOL_CENTER).on("click", a.tools.center);
        if (a.tools.TOGGLE_FULL_SCREEN) c.append("span").attr("id", "popoto-fullscreen-menu").attr("class", "ppt-menu fullscreen").attr("title", a.graph.TOOL_FULL_SCREEN).on("click", a.tools.toggleFullScreen);
        b = b.append("svg").call(a.graph.zoom.on("zoom",
            a.graph.rescale));
        b.on("dblclick.zoom", null).attr("class", "ppt-svg-graph");
        if (!a.graph.WHEEL_ZOOM_ENABLED) b.on("wheel.zoom", null).on("mousewheel.zoom", null);
        a.graph.svg = b.append("svg:g");
        a.graph.svg.append("g").attr("id", a.graph.link.gID);
        a.graph.svg.append("g").attr("id", a.graph.node.gID);
        window.addEventListener("resize", a.graph.centerRootNode)
    };
    a.graph.centerRootNode = function() {
        a.graph.getRootNode().px = a.graph.getSVGWidth() / 2;
        a.graph.getRootNode().py = a.graph.getSVGHeight() / 2;
        a.update()
    };
    a.graph.getSVGWidth =
        function() {
            return "undefined" == typeof a.graph.svg || a.graph.svg.empty() ? (a.logger.debug("popoto.graph.svg is undefined or empty."), 0) : document.getElementById(a.graph.containerId).clientWidth
        };
    a.graph.getSVGHeight = function() {
        return "undefined" == typeof a.graph.svg || a.graph.svg.empty() ? (a.logger.debug("popoto.graph.svg is undefined or empty."), 0) : document.getElementById(a.graph.containerId).clientHeight
    };
    a.graph.rescale = function() {
        a.graph.svg.attr("transform", "translate(" + d3.event.translate + ") scale(" +
            d3.event.scale + ")")
    };
    a.graph.LINK_DISTANCE = 150;
    a.graph.LINK_STRENGTH = 1;
    a.graph.FRICTION = .8;
    a.graph.CHARGE = -1400;
    a.graph.THETA = .8;
    a.graph.GRAVITY = 0;
    a.graph.rootNodeAddListeners = [];
    a.graph.nodeExpandRelationsipListeners = [];
    a.graph.createForceLayout = function() {
        a.graph.force = d3.layout.force().size([a.graph.getSVGWidth(), a.graph.getSVGHeight()]).linkDistance(function(b) {
            return b.type === a.graph.link.LinkTypes.RELATION ? 3 * a.graph.LINK_DISTANCE / 2 : a.graph.LINK_DISTANCE
        }).linkStrength(function(b) {
            return b.linkStrength ?
                b.linkStrength : a.graph.LINK_STRENGTH
        }).friction(a.graph.FRICTION).charge(function(b) {
            return b.charge ? b.charge : a.graph.CHARGE
        }).theta(a.graph.THETA).gravity(a.graph.GRAVITY).on("tick", a.graph.tick);
        a.graph.force.drag().on("dragstart", function(a) {
            d3.event.sourceEvent.stopPropagation()
        }).on("dragend", function(a) {
            d3.event.sourceEvent.stopPropagation()
        })
    };
    a.graph.on = function(b, c) {
        b === a.graph.Events.NODE_ROOT_ADD && a.graph.rootNodeAddListeners.push(c);
        b === a.graph.Events.NODE_EXPAND_RELATIONSHIP && a.graph.nodeExpandRelationsipListeners.push(c)
    };
    a.graph.addRootNode = function(b) {
        0 < a.graph.force.nodes().length && a.logger.debug("popoto.graph.addRootNode is called but the graph is not empty.");
        a.graph.force.nodes().push({
            id: "0",
            type: a.graph.node.NodeTypes.ROOT,
            x: a.graph.getSVGWidth() / 2,
            y: a.graph.getSVGHeight() / 2,
            label: b,
            fixed: !0,
            internalLabel: a.graph.node.generateInternalLabel(b)
        });
        a.graph.rootNodeAddListeners.forEach(function(b) {
            b(a.graph.getRootNode())
        })
    };
    a.graph.getRootNode = function() {
        return a.graph.force.nodes()[0]
    };
    a.graph.tick = function() {
        a.graph.svg.selectAll("#" +
            a.graph.link.gID + " > g").selectAll("path").attr("d", function(b) {
            var c = a.graph.computeParentAngle(b.target),
                d = b.target.x + a.graph.link.RADIUS * Math.cos(c),
                e = b.target.y - a.graph.link.RADIUS * Math.sin(c),
                f = b.source.x - a.graph.link.RADIUS * Math.cos(c),
                c = b.source.y + a.graph.link.RADIUS * Math.sin(c);
            return b.source.x <= b.target.x ? "M" + f + " " + c + "L" + d + " " + e : "M" + d + " " + e + "L" + f + " " + c
        });
        a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").attr("transform", function(a) {
            return "translate(" + a.x + "," + a.y + ")"
        })
    };
    a.graph.link = {};
    a.graph.link.RADIUS = 25;
    a.graph.link.gID = "popoto-glinks";
    a.graph.link.LinkTypes = Object.freeze({
        RELATION: 0,
        VALUE: 1
    });
    a.graph.link.updateLinks = function() {
        a.graph.link.svgLinkElements = a.graph.svg.select("#" + a.graph.link.gID).selectAll("g");
        a.graph.link.updateData();
        a.graph.link.removeElements();
        a.graph.link.addNewElements();
        a.graph.link.updateElements()
    };
    a.graph.link.updateData = function() {
        a.graph.link.svgLinkElements = a.graph.link.svgLinkElements.data(a.graph.force.links(), function(a) {
            return a.id
        })
    };
    a.graph.link.removeElements =
        function() {
            a.graph.link.svgLinkElements.exit().remove()
        };
    a.graph.link.addNewElements = function() {
        var b = a.graph.link.svgLinkElements.enter().append("g").attr("class", "ppt-glink").on("mouseover", a.graph.link.mouseOverLink).on("mouseout", a.graph.link.mouseOutLink);
        b.append("path");
        b.append("text").attr("text-anchor", "middle").attr("dy", "-4").append("textPath").attr("class", "ppt-textPath").attr("startOffset", "50%")
    };
    a.graph.link.updateElements = function() {
        a.graph.link.svgLinkElements.attr("id", function(a) {
            return "ppt-glink_" +
                a.id
        });
        a.graph.link.svgLinkElements.selectAll("path").attr("id", function(a) {
            return "ppt-path_" + a.id
        }).attr("class", function(b) {
            return b.type === a.graph.link.LinkTypes.VALUE ? "ppt-link-value" : 0 == b.target.count ? "ppt-link-relation disabled" : void 0 !== b.target.value ? "ppt-link-relation value" : "ppt-link-relation"
        });
        a.graph.link.svgLinkElements.selectAll("text").attr("id", function(a) {
            return "ppt-text_" + a.id
        }).attr("class", function(b) {
            return b.type === a.graph.link.LinkTypes.VALUE ? "ppt-link-text-value" : 0 == b.target.count ?
                "ppt-link-text-relation disabled" : void 0 !== b.target.value ? "ppt-link-text-relation value" : "ppt-link-text-relation"
        }).selectAll(".ppt-textPath").attr("id", function(a) {
            return "ppt-textpath_" + a.id
        }).attr("xlink:href", function(a) {
            return "#ppt-path_" + a.id
        }).text(function(b) {
            return a.provider.getLinkTextValue(b)
        })
    };
    a.graph.link.mouseOverLink = function() {
        d3.select(this).select("path").classed("ppt-link-hover", !0);
        d3.select(this).select("text").classed("ppt-link-hover", !0);
        var b = d3.select(this).data()[0];
        a.queryviewer.isActive &&
            (a.queryviewer.queryConstraintSpanElements.filter(function(a) {
                return a.ref === b
            }).classed("hover", !0), a.queryviewer.querySpanElements.filter(function(a) {
                return a.ref === b
            }).classed("hover", !0));
        a.cypherviewer.isActive && a.cypherviewer.querySpanElements.filter(function(a) {
            return a.link === b
        }).classed("hover", !0)
    };
    a.graph.link.mouseOutLink = function() {
        d3.select(this).select("path").classed("ppt-link-hover", !1);
        d3.select(this).select("text").classed("ppt-link-hover", !1);
        var b = d3.select(this).data()[0];
        a.queryviewer.isActive &&
            (a.queryviewer.queryConstraintSpanElements.filter(function(a) {
                return a.ref === b
            }).classed("hover", !1), a.queryviewer.querySpanElements.filter(function(a) {
                return a.ref === b
            }).classed("hover", !1));
        a.cypherviewer.isActive && a.cypherviewer.querySpanElements.filter(function(a) {
            return a.link === b
        }).classed("hover", !1)
    };
    a.graph.node = {};
    a.graph.node.gID = "popoto-gnodes";
    a.graph.node.ELLIPSE_RX = 50;
    a.graph.node.ELLIPSE_RY = 25;
    a.graph.node.TEXT_Y = 8;
    a.graph.node.BACK_CIRCLE_R = 70;
    a.graph.node.NODE_MAX_CHARS = 11;
    a.graph.node.PAGE_SIZE =
        10;
    a.graph.node.CountBox = {
        x: 16,
        y: 33,
        w: 52,
        h: 19
    };
    a.graph.node.chooseWaiting = !1;
    a.graph.node.NodeTypes = Object.freeze({
        ROOT: 0,
        CHOOSE: 1,
        VALUE: 2,
        GROUP: 3
    });
    a.graph.node.idgen = 0;
    a.graph.node.internalLabels = {};
    a.graph.node.generateInternalLabel = function(b) {
        b = b.toLowerCase().replace(/ /g, "");
        if (b in a.graph.node.internalLabels) a.graph.node.internalLabels[b] += 1;
        else return a.graph.node.internalLabels[b] = 0, b;
        return b + a.graph.node.internalLabels[b]
    };
    a.graph.node.updateNodes = function() {
        a.graph.node.svgNodeElements ||
            (a.graph.node.svgNodeElements = a.graph.svg.select("#" + a.graph.node.gID).selectAll("g"));
        a.graph.node.updateData();
        a.graph.node.removeElements();
        a.graph.node.addNewElements();
        a.graph.node.updateElements()
    };
    a.graph.node.updateData = function() {
        a.graph.node.svgNodeElements = a.graph.node.svgNodeElements.data(a.graph.force.nodes(), function(a) {
            return a.id
        });
        a.graph.hasGraphChanged && (a.graph.node.updateCount(), a.graph.hasGraphChanged = !1)
    };
    a.graph.node.updateCount = function() {
        var b = [],
            c = a.graph.force.nodes().filter(function(b) {
                return b.type !==
                    a.graph.node.NodeTypes.VALUE && b.type !== a.graph.node.NodeTypes.GROUP
            });
        c.forEach(function(c) {
            c = a.query.generateNodeCountCypherQuery(c);
            b.push({
                statement: c
            })
        });
        a.logger.info("Count nodes ==> ");
        a.rest.post({
            statements: b
        }).done(function(b) {
            b.errors && 0 < b.errors.length && a.logger.error("Cypher query error:" + JSON.stringify(b.errors));
            if (b.results && 0 < b.results.length)
                for (var e = 0; e < c.length; e++) c[e].count = b.results[e].data[0].row[0];
            else c.forEach(function(a) {
                a.count = 0
            });
            a.graph.node.updateElements();
            a.graph.link.updateElements()
        }).fail(function(b,
            e, f) {
            a.logger.error(e + ': error while accessing Neo4j server on URL:"' + a.rest.CYPHER_URL + '" defined in "popoto.rest.CYPHER_URL" property: ' + f);
            c.forEach(function(a) {
                a.count = 0
            });
            a.graph.node.updateElements();
            a.graph.link.updateElements()
        })
    };
    a.graph.node.removeElements = function() {
        var b = a.graph.node.svgNodeElements.exit();
        b.filter(function(a) {
            return !a.parent
        }).remove();
        b.filter(function(a) {
            return a.parent
        }).transition().duration(300).attr("transform", function(a) {
            return "translate(" + a.parent.x + "," + a.parent.y +
                ")"
        }).remove()
    };
    a.graph.node.addNewElements = function() {
        var b = a.graph.node.svgNodeElements.enter().append("g").on("click", a.graph.node.nodeClick).on("mouseover", a.graph.node.mouseOverNode).on("mouseout", a.graph.node.mouseOutNode);
        b.filter(function(b) {
            return b.type !== a.graph.node.NodeTypes.VALUE
        }).on("contextmenu", a.graph.node.clearSelection);
        b.filter(function(b) {
            return b.type === a.graph.node.NodeTypes.VALUE
        }).on("contextmenu", function() {
            d3.event.preventDefault()
        });
        b.append("title").attr("class", "ppt-svg-title");
        a.graph.node.addBackgroundElements(b);
        a.graph.node.addMiddlegroundElements(b);
        a.graph.node.addForegroundElements(b)
    };
    a.graph.node.addBackgroundElements = function(b) {
        b.append("g").attr("class", "ppt-g-node-background").append("circle").attr("class", function(b) {
            var d = "ppt-node-background-circle";
            void 0 !== b.value ? d += " selected-value" : b.type === a.graph.node.NodeTypes.ROOT ? d += " root" : b.type === a.graph.node.NodeTypes.CHOOSE ? d += " choose" : b.type === a.graph.node.NodeTypes.VALUE ? d += " value" : b.type === a.graph.node.NodeTypes.GROUP &&
                (d += " group");
            return d
        }).style("fill-opacity", 0).attr("r", a.graph.node.BACK_CIRCLE_R)
    };
    a.graph.node.addMiddlegroundElements = function(a) {
        a.append("g").attr("class", "ppt-g-node-middleground")
    };
    a.graph.node.addForegroundElements = function(b) {
        b = b.append("g").attr("class", "ppt-g-node-foreground");
        var c = b.filter(function(b) {
            return b.type !== a.graph.node.NodeTypes.VALUE
        }).append("g").attr("class", "ppt-rel-plus-icon");
        c.append("title").text("Add relationship");
        c.append("circle").attr("class", "ppt-rel-plus-background").attr("cx",
            "32").attr("cy", "-43").attr("r", "16");
        c.append("path").attr("class", "ppt-rel-plus-path").attr("d", "M 40,-45 35,-45 35,-50 30,-50 30,-45 25,-45 25,-40 30,-40 30,-35 35,-35 35,-40 40,-40 z");
        c.on("mouseover", function() {
            d3.select(this).select(".ppt-rel-plus-background").transition().style("fill-opacity", .5)
        }).on("mouseout", function() {
            d3.select(this).select(".ppt-rel-plus-background").transition().style("fill-opacity", 0)
        }).on("click", function() {
            d3.event.stopPropagation();
            a.graph.node.expandRelationship.call(this)
        });
        c = b.filter(function(b) {
            return b.type !== a.graph.node.NodeTypes.VALUE
        }).append("g").attr("class", "ppt-rel-minus-icon");
        c.append("title").text("Remove relationship");
        c.append("circle").attr("class", "ppt-rel-minus-background").attr("cx", "32").attr("cy", "-43").attr("r", "16");
        c.append("path").attr("class", "ppt-rel-minus-path").attr("d", "M 40,-45 25,-45 25,-40 40,-40 z");
        c.on("mouseover", function() {
            d3.select(this).select(".ppt-rel-minus-background").transition().style("fill-opacity", .5)
        }).on("mouseout",
            function() {
                d3.select(this).select(".ppt-rel-minus-background").transition().style("fill-opacity", 0)
            }).on("click", function() {
            d3.event.stopPropagation();
            a.graph.node.collapseRelationship.call(this)
        });
        var c = b.filter(function(b) {
                return b.type === a.graph.node.NodeTypes.ROOT || b.type === a.graph.node.NodeTypes.CHOOSE
            }).append("g").attr("class", "ppt-node-foreground-g-arrows"),
            d = c.append("g");
        d.append("circle").attr("class", "ppt-larrow").attr("cx", "-43").attr("cy", "-23").attr("r", "17");
        d.append("path").attr("class",
            "ppt-arrow").attr("d", "m -44.905361,-23 6.742,-6.742 c 0.81,-0.809 0.81,-2.135 0,-2.944 l -0.737,-0.737 c -0.81,-0.811 -2.135,-0.811 -2.945,0 l -8.835,8.835 c -0.435,0.434 -0.628,1.017 -0.597,1.589 -0.031,0.571 0.162,1.154 0.597,1.588 l 8.835,8.834 c 0.81,0.811 2.135,0.811 2.945,0 l 0.737,-0.737 c 0.81,-0.808 0.81,-2.134 0,-2.943 l -6.742,-6.743 z");
        d.on("click", function(b) {
            d3.event.stopPropagation();
            1 < b.page && (b.page--, a.graph.node.collapseNode(b), a.graph.node.expandNode(b))
        });
        c = c.append("g");
        c.append("circle").attr("class",
            "ppt-rarrow").attr("cx", "43").attr("cy", "-23").attr("r", "17");
        c.append("path").attr("class", "ppt-arrow").attr("d", "m 51.027875,-24.5875 -8.835,-8.835 c -0.811,-0.811 -2.137,-0.811 -2.945,0 l -0.738,0.737 c -0.81,0.81 -0.81,2.136 0,2.944 l 6.742,6.742 -6.742,6.742 c -0.81,0.81 -0.81,2.136 0,2.943 l 0.737,0.737 c 0.81,0.811 2.136,0.811 2.945,0 l 8.835,-8.836 c 0.435,-0.434 0.628,-1.017 0.597,-1.588 0.032,-0.569 -0.161,-1.152 -0.596,-1.586 z");
        c.on("click", function(b) {
            d3.event.stopPropagation();
            b.page *
                a.graph.node.PAGE_SIZE < b.count && (b.page++, a.graph.node.collapseNode(b), a.graph.node.expandNode(b))
        });
        b = b.filter(function(b) {
            return b.type !== a.graph.node.NodeTypes.GROUP
        });
        b.append("rect").attr("x", a.graph.node.CountBox.x).attr("y", a.graph.node.CountBox.y).attr("width", a.graph.node.CountBox.w).attr("height", a.graph.node.CountBox.h).attr("class", "ppt-count-box");
        b.append("text").attr("x", 42).attr("y", 48).attr("text-anchor", "middle").attr("class", "ppt-count-text")
    };
    a.graph.node.updateElements = function() {
        a.graph.node.svgNodeElements.attr("id",
            function(a) {
                return "popoto-gnode_" + a.id
            });
        a.graph.node.svgNodeElements.selectAll(".ppt-svg-title").text(function(b) {
            return a.provider.getTextValue(b)
        });
        a.graph.node.svgNodeElements.filter(function(b) {
            return b.type !== a.graph.node.NodeTypes.ROOT
        }).call(a.graph.force.drag);
        a.graph.node.updateBackgroundElements();
        a.graph.node.updateMiddlegroundElements();
        a.graph.node.updateForegroundElements()
    };
    a.graph.node.updateBackgroundElements = function() {
        a.graph.node.svgNodeElements.selectAll(".ppt-g-node-background").selectAll(".ppt-node-background-circle").attr("class",
            function(b) {
                var c = "ppt-node-background-circle";
                b.type === a.graph.node.NodeTypes.VALUE ? c += " value" : b.type === a.graph.node.NodeTypes.GROUP ? c += " group" : void 0 !== b.value ? b.type === a.graph.node.NodeTypes.ROOT ? c += " selected-root-value" : b.type === a.graph.node.NodeTypes.CHOOSE && (c += " selected-value") : 0 == b.count ? c += " disabled" : b.type === a.graph.node.NodeTypes.ROOT ? c += " root" : b.type === a.graph.node.NodeTypes.CHOOSE && (c += " choose");
                return c
            }).attr("r", a.graph.node.BACK_CIRCLE_R)
    };
    a.graph.node.updateMiddlegroundElements =
        function() {
            var b = a.graph.node.svgNodeElements.selectAll(".ppt-g-node-middleground");
            b.selectAll("*").remove();
            b.filter(function(b) {
                return a.provider.getNodeDisplayType(b) === a.provider.NodeDisplayTypes.IMAGE
            }).append("image").attr("class", "ppt-node-image").attr("width", function(b) {
                return a.provider.getImageWidth(b)
            }).attr("height", function(b) {
                return a.provider.getImageHeight(b)
            }).attr("transform", function(b) {
                return "translate(" + -a.provider.getImageWidth(b) / 2 + "," + -a.provider.getImageHeight(b) / 2 + ")"
            }).attr("xlink:href",
                function(b) {
                    return a.provider.getImagePath(b)
                });
            b.filter(function(b) {
                return a.provider.getNodeDisplayType(b) === a.provider.NodeDisplayTypes.TEXT
            }).append("ellipse").attr("rx", a.graph.node.ELLIPSE_RX).attr("ry", a.graph.node.ELLIPSE_RY).attr("rx", a.graph.node.ELLIPSE_RX).attr("ry", a.graph.node.ELLIPSE_RY).attr("class", function(b) {
                if (b.type === a.graph.node.NodeTypes.ROOT) return b.value ? "ppt-node-ellipse selected-root-value" : 0 == b.count ? "ppt-node-ellipse root disabled" : "ppt-node-ellipse root";
                if (b.type ===
                    a.graph.node.NodeTypes.CHOOSE) return b.value ? "ppt-node-ellipse selected-value" : 0 == b.count ? "ppt-node-ellipse choose disabled" : "ppt-node-ellipse choose";
                if (b.type === a.graph.node.NodeTypes.VALUE) return "ppt-node-ellipse value";
                if (b.type === a.graph.node.NodeTypes.GROUP) return "ppt-node-ellipse group"
            });
            var c = b.filter(function(b) {
                return a.provider.getNodeDisplayType(b) === a.provider.NodeDisplayTypes.SVG
            }).append("g").selectAll("path").data(function(b) {
                return a.provider.getSVGPaths(b)
            });
            c.exit().remove();
            c.enter().append("path");
            b.selectAll("path").attr("d", function(a) {
                return a.d
            }).attr("class", function(a) {
                return a["class"]
            });
            b.filter(function(b) {
                return a.provider.isTextDisplayed(b)
            }).append("text").attr("x", 0).attr("y", a.graph.node.TEXT_Y).attr("text-anchor", "middle").attr("y", a.graph.node.TEXT_Y).attr("class", function(b) {
                switch (b.type) {
                    case a.graph.node.NodeTypes.CHOOSE:
                        return void 0 === b.value ? 0 == b.count ? "ppt-node-text-choose disabled" : "ppt-node-text-choose" : "ppt-node-text-choose selected-value";
                    case a.graph.node.NodeTypes.GROUP:
                        return "ppt-node-text-group";
                    case a.graph.node.NodeTypes.ROOT:
                        return void 0 === b.value ? 0 == b.count ? "ppt-node-text-root disabled" : "ppt-node-text-root" : "ppt-node-text-root selected-value";
                    case a.graph.node.NodeTypes.VALUE:
                        return "ppt-node-text-value"
                }
            }).text(function(b) {
                return a.provider.isTextDisplayed(b) ? a.provider.getTextValue(b) : ""
            })
        };
    a.graph.node.updateForegroundElements = function() {
        var b = a.graph.node.svgNodeElements.selectAll(".ppt-g-node-foreground").selectAll(".ppt-node-foreground-g-arrows");
        b.classed("active", function(b) {
            return b.valueExpanded &&
                b.data && b.data.length > a.graph.node.PAGE_SIZE
        });
        b.selectAll(".ppt-larrow").classed("enabled", function(a) {
            return 1 < a.page
        });
        b.selectAll(".ppt-rarrow").classed("enabled", function(b) {
            return b.data ? b.page * a.graph.node.PAGE_SIZE < b.data.length : !1
        });
        b = a.graph.node.svgNodeElements.selectAll(".ppt-g-node-foreground");
        b.selectAll(".ppt-count-box").filter(function(b) {
            return b.type !== a.graph.node.NodeTypes.CHOOSE
        }).classed("root", !0);
        b.selectAll(".ppt-count-box").filter(function(b) {
            return b.type === a.graph.node.NodeTypes.CHOOSE
        }).classed("value", !0);
        b.selectAll(".ppt-count-box").classed("disabled", function(a) {
            return 0 == a.count
        });
        b.selectAll(".ppt-count-text").text(function(a) {
            return null != a.count ? a.count : "..."
        }).classed("disabled", function(a) {
            return 0 == a.count
        });
        b.selectAll(".ppt-rel-plus-icon").classed("disabled", function(a) {
            return a.linkExpanded || 0 == a.count || 0 == a.linkCount
        });
        b.selectAll(".ppt-rel-minus-icon").classed("disabled", function(a) {
            return !a.linkExpanded || 0 == a.count || 0 == a.linkCount
        })
    };
    a.graph.node.mouseOverNode = function() {
        d3.event.preventDefault();
        var b = d3.select(this).data()[0];
        d3.select(this).select(".ppt-g-node-background").selectAll("circle").transition().style("fill-opacity", .5);
        a.queryviewer.isActive && (a.queryviewer.queryConstraintSpanElements.filter(function(a) {
            return a.ref === b
        }).classed("hover", !0), a.queryviewer.querySpanElements.filter(function(a) {
            return a.ref === b
        }).classed("hover", !0));
        a.cypherviewer.isActive && a.cypherviewer.querySpanElements.filter(function(a) {
            return a.node === b
        }).classed("hover", !0)
    };
    a.graph.node.mouseOutNode = function() {
        d3.event.preventDefault();
        var b = d3.select(this).data()[0];
        d3.select(this).select(".ppt-g-node-background").selectAll("circle").transition().style("fill-opacity", 0);
        a.queryviewer.isActive && (a.queryviewer.queryConstraintSpanElements.filter(function(a) {
            return a.ref === b
        }).classed("hover", !1), a.queryviewer.querySpanElements.filter(function(a) {
            return a.ref === b
        }).classed("hover", !1));
        a.cypherviewer.isActive && a.cypherviewer.querySpanElements.filter(function(a) {
            return a.node === b
        }).classed("hover", !1)
    };
    a.graph.node.nodeClick = function() {
        var b = d3.select(this).data()[0];
        if (b.data == 'undefined'){
            console.log('nao tem data');
        } else {
            document.getElementById("node1").value= b.label;
        };

        a.logger.debug(b);
        a.logger.debug("nodeClick (" + b.label + ")");
        if (b.type === a.graph.node.NodeTypes.VALUE) a.graph.node.valueNodeClick(b);
        else if (b.type === a.graph.node.NodeTypes.CHOOSE || b.type === a.graph.node.NodeTypes.ROOT) b.valueExpanded ? a.graph.node.collapseNode(b) : a.graph.node.chooseNodeClick(b)
    };
    a.graph.node.collapseNode = function(b) {
        if (b.valueExpanded) {
            a.logger.debug("collapseNode (" + b.label + ")");
            var c = a.graph.force.links().filter(function(c) {
                return c.source === b && c.type === a.graph.link.LinkTypes.VALUE
            });
            c.forEach(function(b) {
                a.graph.force.nodes().splice(a.graph.force.nodes().indexOf(b.target), 1)
            });
            for (var d = a.graph.force.links().length - 1; 0 <= d; d--) 0 <= c.indexOf(a.graph.force.links()[d]) && a.graph.force.links().splice(d, 1);
            b.type !== a.graph.node.NodeTypes.ROOT && (b.fixed = !1);
            b.parent && b.parent.type !== a.graph.node.NodeTypes.ROOT && (b.parent.fixed = !1);
            b.valueExpanded = !1;
            a.update()
        } else a.logger.debug("collapseNode called on an unexpanded node")
    };
    a.graph.node.valueNodeClick = function(b) {
        a.logger.debug("valueNodeClick (" +
            b.label + ")");
        b.parent.value = b;
        a.result.hasChanged = !0;
        a.graph.hasGraphChanged = !0;
        a.graph.node.collapseNode(b.parent)
    };
    a.graph.node.chooseNodeClick = function(b) {
        a.logger.debug("chooseNodeClick (" + b.label + ") with waiting state set to " + a.graph.node.chooseWaiting);
        a.graph.node.chooseWaiting || b.immutable || (a.graph.force.nodes().forEach(function(b) {
            b.type != a.graph.node.NodeTypes.ROOT && b.type != a.graph.node.NodeTypes.CHOOSE || !b.valueExpanded || a.graph.node.collapseNode(b)
        }), a.graph.node.chooseWaiting = !0, a.logger.info("Values (" +
            b.label + ") ==> "), a.rest.post({
            statements: [{
                statement: a.query.generateValueQuery(b)
            }]
        }).done(function(c) {
            b.id = ++a.graph.node.idgen;
            b.data = a.graph.node.parseResultData(c);
            b.page = 1;
            a.graph.node.expandNode(b);
            a.graph.node.chooseWaiting = !1
        }).fail(function(b, d, e) {
            a.graph.node.chooseWaiting = !1;
            a.logger.error(d + ': error while accessing Neo4j server on URL:"' + a.rest.CYPHER_URL + '" defined in "popoto.rest.CYPHER_URL" property: ' + e)
        }))
    };
    a.graph.node.parseResultData = function(a) {
        for (var c = [], d = 0; d < a.results[0].data.length; d++) {
            for (var e = {}, f = 0; f < a.results[0].columns.length; f++) e[a.results[0].columns[f]] = a.results[0].data[d].row[f];
            c.push(e)
        }
        return c
    };
    a.graph.computeParentAngle = function(a) {
        var c = 0;
        if (a.parent) {
            var c = a.parent.x,
                d = a.parent.y,
                e = a.x;
            a = a.y;
            var f = 100 / (Math.sqrt(Math.pow(c - e, 2) + Math.pow(d - a, 2)) - 100),
                c = ((e + f * c) / (1 + f) - e) / 100; - 1 > c && (c = -1);
            1 < c && (c = 1);
            c = Math.acos(c);
            d > a && (c = 2 * Math.PI - c)
        }
        return c
    };
    a.graph.node.expandNode = function(b) {
        var c = b.page * a.graph.node.PAGE_SIZE,
            d = b.data.slice(c - a.graph.node.PAGE_SIZE, c),
            e = a.graph.computeParentAngle(b),
            f = 1;
        d.forEach(function(c) {
            var g;
            g = b.parent ? 360 / (d.length + 1) * f : 360 / d.length * f;
            var h = b.x + 100 * Math.cos(Math.PI / 180 * g - e);
            g = b.y + 100 * Math.sin(Math.PI / 180 * g - e);
            c = {
                id: ++a.graph.node.idgen,
                parent: b,
                attributes: c,
                type: a.graph.node.NodeTypes.VALUE,
                label: b.label,
                count: c.count,
                x: h,
                y: g,
                internalID: c[a.query.NEO4J_INTERNAL_ID.queryInternalName]
            };
            a.graph.force.nodes().push(c);
            a.graph.force.links().push({
                id: "l" + ++a.graph.node.idgen,
                source: b,
                target: c,
                type: a.graph.link.LinkTypes.VALUE
            });
            f++
        });
        b.fixed = !0;
        b.parent && b.parent.type !==
            a.graph.node.NodeTypes.ROOT && (b.parent.fixed = !0);
        b.valueExpanded = !0;
        a.update()
    };
    a.graph.node.expandRelationship = function() {
        d3.event.preventDefault();
        a.graph.nodeExpandRelationsipListeners.forEach(function(a) {
            a(this)
        });
        var b = d3.select(this).data()[0];
        b.linkExpanded || a.graph.node.linkWaiting || b.valueExpanded || (a.graph.node.linkWaiting = !0, a.logger.info("Relations (" + b.label + ") ==> "), a.rest.post({
            statements: [{
                statement: a.query.generateLinkQuery(b)
            }]
        }).done(function(c) {
            var d = a.graph.node.parseResultData(c),
                d = d.filter(function(b) {
                    return a.query.filterRelation(b)
                });
            if (0 >= d.length) b.linkExpanded = !0, b.linkCount = 0, a.graph.hasGraphChanged = !0;
            else {
                var e = a.graph.computeParentAngle(b),
                    f = 1;
                d.forEach(function(c) {
                    var g;
                    g = e ? 360 / (d.length + 1) * f : 360 / d.length * f;
                    var h = b.x + 100 * Math.cos(Math.PI / 180 * g - e);
                    g = b.y + 100 * Math.sin(Math.PI / 180 * g - e);
                    var k = a.provider.getIsGroup(c),
                        h = {
                            id: "" + ++a.graph.node.idgen,
                            parent: b,
                            type: k ? a.graph.node.NodeTypes.GROUP : a.graph.node.NodeTypes.CHOOSE,
                            label: c.label,
                            fixed: !1,
                            internalLabel: a.graph.node.generateInternalLabel(c.label),
                            x: h,
                            y: g
                        };
                    a.graph.force.nodes().push(h);
                    a.graph.force.links().push({
                        id: "l" + ++a.graph.node.idgen,
                        source: b,
                        target: h,
                        type: a.graph.link.LinkTypes.RELATION,
                        label: c.relationship
                    });
                    f++
                });
                a.graph.hasGraphChanged = !0;
                b.linkExpanded = !0;
                b.linkCount = d.length
            }
            a.update();
            a.graph.node.linkWaiting = !1
        }).fail(function(b, d, e) {
            a.logger.error(d + ': error while accessing Neo4j server on URL:"' + a.rest.CYPHER_URL + '" defined in "popoto.rest.CYPHER_URL" property: ' + e);
            a.graph.node.linkWaiting = !1
        }))
    };
    a.graph.node.collapseRelationship =
        function() {
            d3.event.preventDefault();
            var b = d3.select(this).data()[0];
            if (b.linkExpanded && 0 < b.linkCount && !a.graph.node.linkWaiting && !b.valueExpanded) {
                a.graph.force.nodes().forEach(function(b) {
                    b.type !== a.graph.node.NodeTypes.CHOOSE && b.type !== a.graph.node.NodeTypes.ROOT || !b.valueExpanded || a.graph.node.collapseNode(b)
                });
                var c = a.graph.force.links().filter(function(c) {
                    return c.source === b && c.type === a.graph.link.LinkTypes.RELATION
                });
                c.forEach(function(b) {
                    a.graph.node.removeNode(b.target)
                });
                for (var d = a.graph.force.links().length -
                        1; 0 <= d; d--) 0 <= c.indexOf(a.graph.force.links()[d]) && a.graph.force.links().splice(d, 1);
                b.linkExpanded = !1;
                a.result.hasChanged = !0;
                a.graph.hasGraphChanged = !0;
                a.update()
            }
        };
    a.graph.node.removeNode = function(b) {
        var c = a.graph.force.links().filter(function(a) {
            return a.source === b
        });
        c.forEach(function(b) {
            a.graph.node.removeNode(b.target)
        });
        for (var d = a.graph.force.links().length - 1; 0 <= d; d--) 0 <= c.indexOf(a.graph.force.links()[d]) && a.graph.force.links().splice(d, 1);
        a.graph.force.nodes().splice(a.graph.force.nodes().indexOf(b),
            1)
    };
    a.graph.node.clearSelection = function() {
        d3.event.preventDefault();
        var b = d3.select(this).data()[0];
        a.graph.force.nodes().forEach(function(b) {
            b.type !== a.graph.node.NodeTypes.CHOOSE && b.type !== a.graph.node.NodeTypes.ROOT || !b.valueExpanded || a.graph.node.collapseNode(b)
        });
        null == b.value || b.immutable || (delete b.value, a.result.hasChanged = !0, a.graph.hasGraphChanged = !0, a.update())
    };
    a.queryviewer = {};
    a.queryviewer.containerId = "popoto-query";
    a.queryviewer.QUERY_STARTER = "I'm looking for";
    a.queryviewer.CHOOSE_LABEL =
        "choose";
    a.queryviewer.createQueryArea = function() {
        var b = "#" + a.queryviewer.containerId;
        a.queryviewer.queryConstraintSpanElements = d3.select(b).append("p").attr("class", "ppt-query-constraint-elements").selectAll(".queryConstraintSpan");
        a.queryviewer.querySpanElements = d3.select(b).append("p").attr("class", "ppt-query-elements").selectAll(".querySpan")
    };
    a.queryviewer.updateQuery = function() {
        a.queryviewer.queryConstraintSpanElements = a.queryviewer.queryConstraintSpanElements.data([]);
        a.queryviewer.querySpanElements =
            a.queryviewer.querySpanElements.data([]);
        a.queryviewer.queryConstraintSpanElements.exit().remove();
        a.queryviewer.querySpanElements.exit().remove();
        a.queryviewer.queryConstraintSpanElements = a.queryviewer.queryConstraintSpanElements.data(a.queryviewer.generateConstraintData(a.graph.force.links(), a.graph.force.nodes()));
        a.queryviewer.querySpanElements = a.queryviewer.querySpanElements.data(a.queryviewer.generateData(a.graph.force.links(), a.graph.force.nodes()));
        a.queryviewer.queryConstraintSpanElements.enter().append("span").on("contextmenu",
            a.queryviewer.rightClickSpan).on("click", a.queryviewer.clickSpan).on("mouseover", a.queryviewer.mouseOverSpan).on("mouseout", a.queryviewer.mouseOutSpan);
        a.queryviewer.querySpanElements.enter().append("span").on("contextmenu", a.queryviewer.rightClickSpan).on("click", a.queryviewer.clickSpan).on("mouseover", a.queryviewer.mouseOverSpan).on("mouseout", a.queryviewer.mouseOutSpan);
        a.queryviewer.queryConstraintSpanElements.attr("id", function(a) {
            return a.id
        }).attr("class", function(b) {
            return b.isLink ? "ppt-span-link" :
                b.type === a.graph.node.NodeTypes.ROOT ? "ppt-span-root" : b.type === a.graph.node.NodeTypes.CHOOSE ? b.ref.value ? "ppt-span-value" : "ppt-span-choose" : b.type === a.graph.node.NodeTypes.VALUE ? "ppt-span-value" : b.type === a.graph.node.NodeTypes.GROUP ? "ppt-span-group" : "ppt-span"
        }).text(function(a) {
            return a.term + " "
        });
        a.queryviewer.querySpanElements.attr("id", function(a) {
            return a.id
        }).attr("class", function(b) {
            return b.isLink ? "ppt-span-link" : b.type === a.graph.node.NodeTypes.ROOT ? "ppt-span-root" : b.type === a.graph.node.NodeTypes.CHOOSE ?
                b.ref.value ? "ppt-span-value" : "ppt-span-choose" : b.type === a.graph.node.NodeTypes.VALUE ? "ppt-span-value" : b.type === a.graph.node.NodeTypes.GROUP ? "ppt-span-group" : "ppt-span"
        }).text(function(a) {
            return a.term + " "
        })
    };
    a.queryviewer.generateConstraintData = function(b, c) {
        var d = [],
            e = 0;
        d.push({
            id: e++,
            term: a.queryviewer.QUERY_STARTER
        });
        0 < c.length && d.push({
            id: e++,
            type: c[0].type,
            term: a.provider.getSemanticValue(c[0]),
            ref: c[0]
        });
        b.forEach(function(b) {
            var c = b.source,
                g = b.target;
            b.type === a.graph.link.LinkTypes.RELATION &&
                g.type !== a.graph.node.NodeTypes.GROUP && g.value && (c.type === a.graph.node.NodeTypes.GROUP && d.push({
                    id: e++,
                    type: c.type,
                    term: a.provider.getSemanticValue(c),
                    ref: c
                }), d.push({
                    id: e++,
                    isLink: !0,
                    term: a.provider.getLinkSemanticValue(b),
                    ref: b
                }), g.type !== a.graph.node.NodeTypes.GROUP && (g.value ? d.push({
                    id: e++,
                    type: g.type,
                    term: a.provider.getSemanticValue(g),
                    ref: g
                }) : d.push({
                    id: e++,
                    type: g.type,
                    term: "<" + a.queryviewer.CHOOSE_LABEL + " " + a.provider.getSemanticValue(g) + ">",
                    ref: g
                })))
        });
        return d
    };
    a.queryviewer.generateData =
        function(b, c) {
            var d = [],
                e = [],
                f = 0;
            b.forEach(function(b) {
                var c = b.source,
                    h = b.target;
                h.type === a.graph.node.NodeTypes.GROUP && e.push({
                    id: f++,
                    type: h.type,
                    term: a.provider.getSemanticValue(h),
                    ref: h
                });
                b.type !== a.graph.link.LinkTypes.RELATION || h.type === a.graph.node.NodeTypes.GROUP || h.value || (c.type === a.graph.node.NodeTypes.GROUP && d.push({
                        id: f++,
                        type: c.type,
                        term: a.provider.getSemanticValue(c),
                        ref: c
                    }), d.push({
                        id: f++,
                        isLink: !0,
                        term: a.provider.getLinkSemanticValue(b),
                        ref: b
                    }), h.type !== a.graph.node.NodeTypes.GROUP &&
                    (h.value ? d.push({
                        id: f++,
                        type: h.type,
                        term: a.provider.getSemanticValue(h),
                        ref: h
                    }) : d.push({
                        id: f++,
                        type: h.type,
                        term: "<" + a.queryviewer.CHOOSE_LABEL + " " + a.provider.getSemanticValue(h) + ">",
                        ref: h
                    })))
            });
            return d.concat(e)
        };
    a.queryviewer.mouseOverSpan = function() {
        d3.select(this).classed("hover", function(a) {
            return a.ref
        });
        var b = d3.select(this).data()[0];
        if (b.ref) {
            var c = a.graph.svg.selectAll("#" + a.graph.link.gID + " > g").filter(function(a) {
                return a === b.ref
            });
            c.select("path").classed("ppt-link-hover", !0);
            c.select("text").classed("ppt-link-hover", !0);
            a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
                return a === b.ref
            }).select(".ppt-g-node-background").selectAll("circle").transition().style("fill-opacity", .5);
            a.cypherviewer.isActive && a.cypherviewer.querySpanElements.filter(function(a) {
                return a.node === b.ref || a.link === b.ref
            }).classed("hover", !0)
        }
    };
    a.queryviewer.rightClickSpan = function() {
        var b = d3.select(this).data()[0];
        if (!b.isLink && b.ref) {
            var c = a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
                return a ===
                    b.ref
            });
            c.on("contextmenu").call(c.node(), b.ref)
        }
    };
    a.queryviewer.clickSpan = function() {
        var b = d3.select(this).data()[0];
        if (!b.isLink && b.ref) {
            var c = a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
                return a === b.ref
            });
            c.on("click").call(c.node(), b.ref)
        }
    };
    a.queryviewer.mouseOutSpan = function() {
        d3.select(this).classed("hover", !1);
        var b = d3.select(this).data()[0];
        if (b.ref) {
            var c = a.graph.svg.selectAll("#" + a.graph.link.gID + " > g").filter(function(a) {
                return a === b.ref
            });
            c.select("path").classed("ppt-link-hover", !1);
            c.select("text").classed("ppt-link-hover", !1);
            a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
                return a === b.ref
            }).select(".ppt-g-node-background").selectAll("circle").transition().style("fill-opacity", 0);
            a.cypherviewer.isActive && a.cypherviewer.querySpanElements.filter(function(a) {
                return a.node === b.ref || a.link === b.ref
            }).classed("hover", !1)
        }
    };
    a.cypherviewer = {};
    a.cypherviewer.containerId = "popoto-cypher";
    a.cypherviewer.MATCH = "MATCH";
    a.cypherviewer.RETURN = "RETURN";
    a.cypherviewer.QueryElementTypes =
        Object.freeze({
            KEYWORD: 0,
            NODE: 1,
            SEPARATOR: 2,
            SOURCE: 3,
            LINK: 4,
            TARGET: 5,
            RETURN: 6
        });
    a.cypherviewer.createQueryArea = function() {
        a.cypherviewer.querySpanElements = d3.select("#" + a.cypherviewer.containerId).append("p").attr("class", "ppt-query-constraint-elements").selectAll(".queryConstraintSpan")
    };
    a.cypherviewer.updateQuery = function() {
        a.cypherviewer.querySpanElements = a.cypherviewer.querySpanElements.data([]);
        a.cypherviewer.querySpanElements.exit().remove();
        a.cypherviewer.querySpanElements = a.cypherviewer.querySpanElements.data(a.cypherviewer.generateData(a.graph.force.links(),
            a.graph.force.nodes()));
        a.cypherviewer.querySpanElements.enter().append("span").attr("id", function(a) {
            return "cypher-" + a.id
        }).on("mouseover", a.cypherviewer.mouseOverSpan).on("mouseout", a.cypherviewer.mouseOutSpan).on("contextmenu", a.cypherviewer.rightClickSpan).on("click", a.cypherviewer.clickSpan);
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type === a.cypherviewer.QueryElementTypes.KEYWORD
        }).attr("class", "ppt-span").text(function(a) {
            return " " + a.value + " "
        });
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type ===
                a.cypherviewer.QueryElementTypes.SEPARATOR
        }).attr("class", "ppt-span").text(function(a) {
            return a.value + " "
        });
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type === a.cypherviewer.QueryElementTypes.NODE
        }).attr("class", function(a) {
            return a.node.value ? "ppt-span-root-value" : "ppt-span-root"
        }).text(function(b) {
            var c = "";
            if (b.node.value)
                if (c = a.provider.getConstraintAttribute(b.node.label), c === a.query.NEO4J_INTERNAL_ID) c = "{`id`:" + b.node.value.internalID + "}";
                else var d = b.node.value.attributes[c],
                    c = "boolean" === typeof d || "number" === typeof d ? "{`" + c + "`:" + d + "}" : "{`" + c + '`:"' + d + '"}';
            return "(" + b.node.internalLabel + ":`" + b.node.label + "`" + c + ")"
        });
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type === a.cypherviewer.QueryElementTypes.SOURCE
        }).attr("class", function(b) {
            return b.node === a.graph.getRootNode() ? b.node.value ? "ppt-span-root-value" : "ppt-span-root" : b.node.value ? "ppt-span-value" : "ppt-span-choose"
        }).text(function(a) {
            a = a.node;
            return "(" + a.internalLabel + ":`" + a.label + "`)"
        });
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type ===
                a.cypherviewer.QueryElementTypes.LINK
        }).attr("class", "ppt-span-link").text(function(a) {
            return "-[:`" + a.link.label + "`]->"
        });
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type === a.cypherviewer.QueryElementTypes.TARGET
        }).attr("class", function(a) {
            return a.node.value ? "ppt-span-value" : "ppt-span-choose"
        }).text(function(b) {
            b = b.node;
            var c = "";
            if (b.value)
                if (c = a.provider.getConstraintAttribute(b.label), c === a.query.NEO4J_INTERNAL_ID) c = "{`id`:" + b.value.internalID + "}";
                else var d = b.value.attributes[c],
                    c = "boolean" === typeof d || "number" === typeof d ? "{`" + c + "`:" + d + "}" : "{`" + c + '`:"' + d + '"}';
            return "(" + b.internalLabel + ":`" + b.label + "`" + c + ")"
        });
        a.cypherviewer.querySpanElements.filter(function(b) {
            return b.type === a.cypherviewer.QueryElementTypes.RETURN
        }).attr("class", function(a) {
            return a.node.value ? "ppt-span-root-value" : "ppt-span-root"
        }).text(function(a) {
            return a.node.internalLabel
        })
    };
    a.cypherviewer.generateData = function(b) {
        var c = [],
            d = 0,
            e = a.graph.getRootNode();
        b = a.query.getRelevantLinks(e, e, b);
        c.push({
            id: d++,
            type: a.cypherviewer.QueryElementTypes.KEYWORD,
            value: a.cypherviewer.MATCH
        });
        e && c.push({
            id: d++,
            type: a.cypherviewer.QueryElementTypes.NODE,
            node: e
        });
        0 < b.length && c.push({
            id: d++,
            type: a.cypherviewer.QueryElementTypes.SEPARATOR,
            value: ","
        });
        for (var f = 0; f < b.length; f++) c.push({
                id: d++,
                type: a.cypherviewer.QueryElementTypes.SOURCE,
                node: b[f].source
            }), c.push({
                id: d++,
                type: a.cypherviewer.QueryElementTypes.LINK,
                link: b[f]
            }), c.push({
                id: d++,
                type: a.cypherviewer.QueryElementTypes.TARGET,
                node: b[f].target
            }), f < b.length - 1 &&
            c.push({
                id: d++,
                type: a.cypherviewer.QueryElementTypes.SEPARATOR,
                value: ","
            });
        c.push({
            id: d++,
            type: a.cypherviewer.QueryElementTypes.KEYWORD,
            value: a.cypherviewer.RETURN
        });
        e && c.push({
            id: d++,
            type: a.cypherviewer.QueryElementTypes.RETURN,
            node: e
        });
        return c
    };
    a.cypherviewer.mouseOverSpan = function() {
        var b = d3.select(this).data()[0];
        if (b.node) a.cypherviewer.querySpanElements.filter(function(a) {
            return a.node === b.node
        }).classed("hover", !0), a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
            return a ===
                b.node
        }).select(".ppt-g-node-background").selectAll("circle").transition().style("fill-opacity", .5), a.queryviewer.isActive && (a.queryviewer.queryConstraintSpanElements.filter(function(a) {
            return a.ref === b.node
        }).classed("hover", !0), a.queryviewer.querySpanElements.filter(function(a) {
            return a.ref === b.node
        }).classed("hover", !0));
        else if (b.link) {
            d3.select(this).classed("hover", !0);
            var c = a.graph.svg.selectAll("#" + a.graph.link.gID + " > g").filter(function(a) {
                return a === b.link
            });
            c.select("path").classed("ppt-link-hover", !0);
            c.select("text").classed("ppt-link-hover", !0)
        }
    };
    a.cypherviewer.mouseOutSpan = function() {
        var b = d3.select(this).data()[0];
        if (b.node) a.cypherviewer.querySpanElements.filter(function(a) {
            return a.node === b.node
        }).classed("hover", !1), a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
            return a === b.node
        }).select(".ppt-g-node-background").selectAll("circle").transition().style("fill-opacity", 0), a.queryviewer.isActive && (a.queryviewer.queryConstraintSpanElements.filter(function(a) {
            return a.ref ===
                b.node
        }).classed("hover", !1), a.queryviewer.querySpanElements.filter(function(a) {
            return a.ref === b.node
        }).classed("hover", !1));
        else if (b.link) {
            d3.select(this).classed("hover", !1);
            var c = a.graph.svg.selectAll("#" + a.graph.link.gID + " > g").filter(function(a) {
                return a === b.link
            });
            c.select("path").classed("ppt-link-hover", !1);
            c.select("text").classed("ppt-link-hover", !1)
        }
    };
    a.cypherviewer.clickSpan = function() {
        var b = d3.select(this).data()[0];
        if (b.node) {
            var c = a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
                return a ===
                    b.node
            });
            c.on("click").call(c.node(), b.node)
        }
    };
    a.cypherviewer.rightClickSpan = function() {
        var b = d3.select(this).data()[0];
        if (b.node) {
            var c = a.graph.svg.selectAll("#" + a.graph.node.gID + " > g").filter(function(a) {
                return a === b.node
            });
            c.on("contextmenu").call(c.node(), b.node)
        }
    };
    a.query = {};
    a.query.RESULTS_PAGE_SIZE = 100;
    a.query.VALUE_QUERY_LIMIT = 1E3;
    a.query.USE_PARENT_RELATION = !1;
    a.query.USE_RELATION_DIRECTION = !0;
    a.query.NEO4J_INTERNAL_ID = Object.freeze({
        queryInternalName: "NEO4JID"
    });
    a.query.filterRelation =
        function(a) {
            return !0
        };
    a.query.generateTaxonomyCountQuery = function(b) {
        var c = a.provider.getConstraintAttribute(b),
            d = [];
        a.provider.getPredefinedConstraints(b).forEach(function(a) {
            d.push(a.replace(RegExp("\\$identifier", "g"), "n"))
        });
        return c === a.query.NEO4J_INTERNAL_ID ? "MATCH (n:`" + b + "`)" + (0 < d.length ? " WHERE " + d.join(" AND ") : "") + " RETURN count(DISTINCT ID(n)) as count" : "MATCH (n:`" + b + "`)" + (0 < d.length ? " WHERE " + d.join(" AND ") : "") + " RETURN count(DISTINCT n." + c + ") as count"
    };
    a.query.generateQueryElements =
        function(b, c, d, e) {
            var f = [],
                l = [],
                g = a.query.USE_RELATION_DIRECTION ? "->" : "-";
            a.provider.getPredefinedConstraints(b.label).forEach(function(a) {
                l.push(a.replace(RegExp("\\$identifier", "g"), b.internalLabel))
            });
            if (b.value && (e || b.immutable)) {
                var h = a.provider.getConstraintAttribute(b.label);
                if (h === a.query.NEO4J_INTERNAL_ID) f.push("(" + b.internalLabel + ":`" + b.label + "`)"), l.push("ID(" + b.internalLabel + ") = " + b.value.internalID);
                else {
                    var k = b.value.attributes[h];
                    "boolean" === typeof k || "number" === typeof k ? f.push("(" +
                        b.internalLabel + ":`" + b.label + "`{`" + h + "`:" + k + "})") : f.push("(" + b.internalLabel + ":`" + b.label + "`{`" + h + '`:"' + k + '"})')
                }
            } else f.push("(" + b.internalLabel + ":`" + b.label + "`)");
            d.forEach(function(d) {
                var h = d.source,
                    k = d.target;
                a.provider.getPredefinedConstraints(k.label).forEach(function(a) {
                    l.push(a.replace(RegExp("\\$identifier", "g"), k.internalLabel))
                });
                if (k.value && k !== c && (e || b.immutable)) {
                    var m = a.provider.getConstraintAttribute(k.label),
                        n = k.value.attributes[m];
                    m === a.query.NEO4J_INTERNAL_ID ? (f.push("(" + h.internalLabel +
                        ":`" + h.label + "`)-[:`" + d.label + "`]" + g + "(" + k.internalLabel + ":`" + k.label + "`)"), l.push("ID(" + k.internalLabel + ") = " + k.value.internalID)) : "boolean" === typeof n || "number" === typeof n ? f.push("(" + h.internalLabel + ":`" + h.label + "`)-[:`" + d.label + "`]" + g + "(" + k.internalLabel + ":`" + k.label + "`{`" + m + "`:" + n + "})") : f.push("(" + h.internalLabel + ":`" + h.label + "`)-[:`" + d.label + "`]" + g + "(" + k.internalLabel + ":`" + k.label + "`{`" + m + '`:"' + n + '"})')
                } else f.push("(" + h.internalLabel + ":`" + h.label + "`)-[:`" + d.label + "`]" + g + "(" + k.internalLabel +
                    ":`" + k.label + "`)")
            });
            return {
                matchElements: f,
                whereElements: l
            }
        };
    a.query.getRelevantLinks = function(a, c, d) {
        var e = d.slice(),
            f = [],
            l = [];
        e.forEach(function(a) {
            (a.target.value || a.target === c) && f.push(a)
        });
        f.forEach(function(a) {
            e.splice(e.indexOf(a), 1)
        });
        f.forEach(function(c) {
            var d = c.source;
            for (c = !0; c;) {
                var f = null;
                e.forEach(function(a) {
                    a.target === d && (f = a)
                });
                null === f ? c = !1 : f.source === a ? (l.push(f), e.splice(e.indexOf(f), 1), c = !1) : (l.push(f), e.splice(e.indexOf(f), 1), d = f.source)
            }
        });
        return f.concat(l)
    };
    a.query.getLinksToRoot =
        function(b, c) {
            for (var d = [], e = b; e !== a.graph.getRootNode();) {
                for (var f, l = 0; l < c.length; l++) {
                    var g = c[l];
                    if (g.target === e) {
                        f = g;
                        break
                    }
                }
                f && (d.push(f), e = f.source)
            }
            return d
        };
    a.query.generateLinkQuery = function(b) {
        var c = a.query.getLinksToRoot(b, a.graph.force.links()),
            d = a.query.generateQueryElements(a.graph.getRootNode(), b, c, !1),
            c = d.matchElements,
            e = [],
            d = d.whereElements,
            f = [];
        c.push("(" + b.internalLabel + ":`" + b.label + "`)-[r]" + (a.query.USE_RELATION_DIRECTION ? "->" : "-") + "(x)");
        e.push("type(r) AS relationship");
        a.query.USE_PARENT_RELATION ?
            e.push("head(labels(x)) AS label") : e.push("last(labels(x)) AS label");
        e.push("count(r) AS count");
        f.push("ORDER BY count(r) DESC");
        return "MATCH " + c.join(", ") + (0 < d.length ? " WHERE " + d.join(" AND ") : "") + " RETURN " + e.join(", ") + " " + f.join(" ")
    };
    a.query.generateResultCypherQuery = function() {
        var b = a.graph.getRootNode(),
            c = a.query.generateQueryElements(b, b, a.query.getRelevantLinks(b, b, a.graph.force.links()), !0),
            d = c.matchElements,
            e = [],
            c = c.whereElements,
            f = [],
            l = a.provider.getResultOrderByAttribute(b.label);
        if (l) {
            var g = a.provider.isResultOrderAscending(b.label) ? "ASC" : "DESC";
            f.push("ORDER BY " + l + " " + g)
        }
        f.push("LIMIT " + a.query.RESULTS_PAGE_SIZE);
        for (var l = a.provider.getReturnAttributes(b.label), g = a.provider.getConstraintAttribute(b.label), h = 0; h < l.length; h++) {
            var k = l[h];
            k === a.query.NEO4J_INTERNAL_ID ? k == g ? e.push("ID(" + b.internalLabel + ") AS " + a.query.NEO4J_INTERNAL_ID.queryInternalName) : e.push("COLLECT(DISTINCT ID(" + b.internalLabel + ")) AS " + a.query.NEO4J_INTERNAL_ID.queryInternalName) : k == g ? e.push(b.internalLabel +
                "." + k + " AS " + k) : e.push("COLLECT(DISTINCT " + b.internalLabel + "." + k + ") AS " + k)
        }
        return "MATCH " + d.join(", ") + (0 < c.length ? " WHERE " + c.join(" AND ") : "") + " RETURN DISTINCT " + e.join(", ") + " " + f.join(" ")
    };
    a.query.generateResultCypherQueryCount = function() {
        var b = a.graph.getRootNode(),
            c = a.query.generateQueryElements(b, b, a.query.getRelevantLinks(b, b, a.graph.force.links()), !0),
            d = a.provider.getConstraintAttribute(b.label),
            e = c.matchElements,
            f = [],
            c = c.whereElements,
            l = [];
        d === a.query.NEO4J_INTERNAL_ID ? f.push("count(DISTINCT ID(" +
            b.internalLabel + ")) AS count") : f.push("count(DISTINCT " + b.internalLabel + "." + d + ") AS count");
        return "MATCH " + e.join(", ") + (0 < c.length ? " WHERE " + c.join(" AND ") : "") + " RETURN " + f.join(", ") + (0 < l.length ? " " + l.join(" ") : "")
    };
    a.query.generateNodeCountCypherQuery = function(b) {
        var c = a.query.generateQueryElements(a.graph.getRootNode(), b, a.query.getRelevantLinks(a.graph.getRootNode(), b, a.graph.force.links()), !0),
            d = c.matchElements,
            c = c.whereElements,
            e = [],
            f = a.provider.getConstraintAttribute(b.label);
        f === a.query.NEO4J_INTERNAL_ID ?
            e.push("count(DISTINCT ID(" + b.internalLabel + ")) as count") : e.push("count(DISTINCT " + b.internalLabel + "." + f + ") as count");
        return "MATCH " + d.join(", ") + (0 < c.length ? " WHERE " + c.join(" AND ") : "") + " RETURN " + e.join(", ")
    };
    a.query.generateValueQuery = function(b) {
        var c = a.graph.getRootNode(),
            d = a.query.generateQueryElements(c, b, a.query.getRelevantLinks(c, b, a.graph.force.links()), !0),
            e = d.matchElements,
            f = [],
            d = d.whereElements,
            l = [],
            g = a.provider.getValueOrderByAttribute(b.label);
        if (g) {
            var h = a.provider.isValueOrderAscending(b.label) ?
                "ASC" : "DESC";
            f.push("ORDER BY " + g + " " + h)
        }
        f.push("LIMIT " + a.query.VALUE_QUERY_LIMIT);
        for (var g = a.provider.getReturnAttributes(b.label), h = a.provider.getConstraintAttribute(b.label), k = 0; k < g.length; k++) g[k] === a.query.NEO4J_INTERNAL_ID ? g[k] == h ? l.push("ID(" + b.internalLabel + ") AS " + a.query.NEO4J_INTERNAL_ID.queryInternalName) : l.push("COLLECT (DISTINCT ID(" + b.internalLabel + ")) AS " + a.query.NEO4J_INTERNAL_ID.queryInternalName) : g[k] == h ? l.push(b.internalLabel + "." + g[k] + " AS " + g[k]) : l.push("COLLECT(DISTINCT " +
            b.internalLabel + "." + g[k] + ") AS " + g[k]);
        b = a.provider.getConstraintAttribute(c.label);
        b === a.query.NEO4J_INTERNAL_ID ? l.push("count(DISTINCT ID(" + c.internalLabel + ")) AS count") : l.push("count(DISTINCT " + c.internalLabel + "." + b + ") AS count");
        return "MATCH " + e.join(", ") + (0 < d.length ? " WHERE " + d.join(" AND ") : "") + " RETURN DISTINCT " + l.join(", ") + " " + f.join(" ")
    };
    a.result = {};
    a.result.containerId = "popoto-results";
    a.result.hasChanged = !0;
    a.result.resultCountListeners = [];
    a.result.resultListeners = [];
    a.result.onTotalResultCount =
        function(b) {
            a.result.resultCountListeners.push(b)
        };
    a.result.onResultReceived = function(b) {
        a.result.resultListeners.push(b)
    };
    a.result.parseResultData = function(b) {
        var c = [];
        if (b.results && 0 < b.results.length)
            for (var d = 0; d < b.results[0].data.length; d++) {
                for (var e = {
                        resultIndex: d,
                        label: a.graph.getRootNode().label,
                        attributes: {}
                    }, f = 0; f < b.results[0].columns.length; f++) e.attributes[b.results[0].columns[f]] = "" + b.results[0].data[d].row[f];
                c.push(e)
            }
        return c
    };
    a.result.updateResults = function() {
        if (a.result.hasChanged) {
            var b =
                a.query.generateResultCypherQuery();
            a.logger.info("Results ==> ");
            a.rest.post({
                statements: [{
                    statement: b
                }]
            }).done(function(b) {
                b.errors && 0 < b.errors.length && a.logger.error("Cypher query error:" + JSON.stringify(b.errors));
                var d = a.result.parseResultData(b);
                a.result.resultListeners.forEach(function(a) {
                    a(d)
                });
                a.result.isActive && (b = d3.select("#" + a.result.containerId).selectAll(".ppt-result").data([]), b.exit().remove(), b = d3.select("#" + a.result.containerId).selectAll(".ppt-result").data(d, function(a) {
                        return a.resultIndex
                    }),
                    b.enter().append("p").attr("class", "ppt-result").attr("id", function(a) {
                        return "popoto-result-" + a.resultIndex
                    }).each(function(b) {
                        a.provider.getDisplayResultFunction(b.label)(d3.select(this))
                    }));
                a.result.hasChanged = !1
            }).fail(function(b, d, e) {
                a.logger.error(d + ': error while accessing Neo4j server on URL:"' + a.rest.CYPHER_URL + '" defined in "popoto.rest.CYPHER_URL" property: ' + e);
                a.result.resultListeners.forEach(function(a) {
                    a([])
                })
            });
            0 < a.result.resultCountListeners.length && (a.logger.info("Results count ==> "),
                a.rest.post({
                    statements: [{
                        statement: a.query.generateResultCypherQueryCount()
                    }]
                }).done(function(b) {
                    b.errors && 0 < b.errors.length && a.logger.error("Cypher query error:" + JSON.stringify(b.errors));
                    var d = 0;
                    b.results && 0 < b.results.length && (d = b.results[0].data[0].row[0]);
                    a.result.resultCountListeners.forEach(function(a) {
                        a(d)
                    })
                }).fail(function(b, d, e) {
                    a.logger.error(d + ': error while accessing Neo4j server on URL:"' + a.rest.CYPHER_URL + '" defined in "popoto.rest.CYPHER_URL" property: ' + e);
                    a.result.resultCountListeners.forEach(function(a) {
                        a(0)
                    })
                }))
        }
    };
    a.provider = {};
    a.provider.linkProvider = {};
    a.provider.taxonomyProvider = {};
    a.provider.nodeProviders = {};
    a.provider.getLinkTextValue = function(b) {
        if (a.provider.linkProvider.hasOwnProperty("getLinkTextValue")) return a.provider.linkProvider.getLinkTextValue(b);
        if (a.provider.DEFAULT_LINK_PROVIDER.hasOwnProperty("getLinkTextValue")) return a.provider.DEFAULT_LINK_PROVIDER.getLinkTextValue(b);
        a.logger.error("No provider defined for getLinkTextValue")
    };
    a.provider.getLinkSemanticValue = function(b) {
        if (a.provider.linkProvider.hasOwnProperty("getLinkSemanticValue")) return a.provider.linkProvider.getLinkSemanticValue(b);
        if (a.provider.DEFAULT_LINK_PROVIDER.hasOwnProperty("getLinkSemanticValue")) return a.provider.DEFAULT_LINK_PROVIDER.getLinkSemanticValue(b);
        a.logger.error("No provider defined for getLinkSemanticValue")
    };
    a.provider.DEFAULT_LINK_PROVIDER = Object.freeze({
        getLinkTextValue: function(b) {
            return b.type === a.graph.link.LinkTypes.VALUE ? a.provider.isTextDisplayed(b.target) ? "" : a.provider.getTextValue(b.target) : b.label
        },
        getLinkSemanticValue: function(b) {
            return a.provider.getLinkTextValue(b)
        }
    });
    a.provider.linkProvider =
        a.provider.DEFAULT_LINK_PROVIDER;
    a.provider.getTaxonomyTextValue = function(b) {
        if (a.provider.taxonomyProvider.hasOwnProperty("getTextValue")) return a.provider.taxonomyProvider.getTextValue(b);
        if (a.provider.DEFAULT_TAXONOMY_PROVIDER.hasOwnProperty("getTextValue")) return a.provider.DEFAULT_TAXONOMY_PROVIDER.getTextValue(b);
        a.logger.error("No provider defined for taxonomy getTextValue")
    };
    a.provider.DEFAULT_TAXONOMY_PROVIDER = Object.freeze({
        getTextValue: function(a) {
            return a
        }
    });
    a.provider.taxonomyProvider =
        a.provider.DEFAULT_TAXONOMY_PROVIDER;
    a.provider.NodeDisplayTypes = Object.freeze({
        TEXT: 0,
        IMAGE: 1,
        SVG: 2
    });
    a.provider.getProvider = function(b) {
        if (void 0 === b) a.logger.error("Node label is undefined, no label provider can be found.");
        else {
            if (!a.provider.nodeProviders.hasOwnProperty(b)) {
                a.logger.debug("No direct provider found for label " + b);
                for (var c in a.provider.nodeProviders)
                    if (a.provider.nodeProviders.hasOwnProperty(c)) {
                        var d = a.provider.nodeProviders[c];
                        if (d.hasOwnProperty("children") && -1 < d.children.indexOf(b)) {
                            a.logger.debug("No provider is defined for label (" +
                                b + "), parent (" + c + ") will be used");
                            c = {
                                parent: c
                            };
                            for (var e in d) d.hasOwnProperty(e) && "children" != e && "parent" != e && (c[e] = d[e]);
                            a.provider.nodeProviders[b] = c;
                            return a.provider.nodeProviders[b]
                        }
                    }
                a.logger.debug("No label provider defined for label (" + b + ") default one will be created from popoto.provider.DEFAULT_PROVIDER");
                a.provider.nodeProviders[b] = {};
                for (var f in a.provider.DEFAULT_PROVIDER) a.provider.DEFAULT_PROVIDER.hasOwnProperty(f) && (a.provider.nodeProviders[b][f] = a.provider.DEFAULT_PROVIDER[f])
            }
            return a.provider.nodeProviders[b]
        }
    };
    a.provider.getProperty = function(b, c) {
        var d = a.provider.getProvider(b);
        if (!d.hasOwnProperty(c)) {
            for (var e = d, f = !1; e.hasOwnProperty("parent") && !f;) e = a.provider.getProvider(e.parent), e.hasOwnProperty(c) && (d[c] = e[c], f = !0);
            f || (a.logger.debug('No "' + c + '" property found for node label provider (' + b + "), default value will be used"), a.provider.DEFAULT_PROVIDER.hasOwnProperty(c) ? d[c] = a.provider.DEFAULT_PROVIDER[c] : a.logger.error('No default value for "' + c + '" property found for label provider (' + b + ")"))
        }
        return d[c]
    };
    a.provider.getIsSearchable = function(b) {
        return a.provider.getProperty(b, "isSearchable")
    };
    a.provider.getReturnAttributes = function(b) {
        var c = a.provider.getProvider(b),
            d = {};
        if (c.hasOwnProperty("returnAttributes"))
            for (var e = 0; e < c.returnAttributes.length; e++) c.returnAttributes[e] === a.query.NEO4J_INTERNAL_ID ? d[a.query.NEO4J_INTERNAL_ID.queryInternalName] = !0 : d[c.returnAttributes[e]] = !0;
        for (; c.hasOwnProperty("parent");)
            if (c = a.provider.getProvider(c.parent), c.hasOwnProperty("returnAttributes"))
                for (e = 0; e < c.returnAttributes.length; e++) c.returnAttributes[e] ===
                    a.query.NEO4J_INTERNAL_ID ? d[a.query.NEO4J_INTERNAL_ID.queryInternalName] = !0 : d[c.returnAttributes[e]] = !0;
        if (a.provider.DEFAULT_PROVIDER.hasOwnProperty("returnAttributes"))
            for (c = 0; c < a.provider.DEFAULT_PROVIDER.returnAttributes.length; c++) a.provider.DEFAULT_PROVIDER.returnAttributes[c] !== a.query.NEO4J_INTERNAL_ID && (d[a.provider.DEFAULT_PROVIDER.returnAttributes[c]] = !0);
        b = a.provider.getConstraintAttribute(b);
        b === a.query.NEO4J_INTERNAL_ID ? d[a.query.NEO4J_INTERNAL_ID.queryInternalName] = !0 : d[b] = !0;
        b = [];
        for (var f in d) d.hasOwnProperty(f) && (f == a.query.NEO4J_INTERNAL_ID.queryInternalName ? b.push(a.query.NEO4J_INTERNAL_ID) : b.push(f));
        0 >= b.length && b.push(a.query.NEO4J_INTERNAL_ID);
        return b
    };
    a.provider.getConstraintAttribute = function(b) {
        return a.provider.getProperty(b, "constraintAttribute")
    };
    a.provider.getPredefinedConstraints = function(b) {
        return a.provider.getProperty(b, "getPredefinedConstraints")()
    };
    a.provider.getValueOrderByAttribute = function(b) {
        return a.provider.getProperty(b, "valueOrderByAttribute")
    };
    a.provider.isValueOrderAscending = function(b) {
        return a.provider.getProperty(b, "isValueOrderAscending")
    };
    a.provider.getResultOrderByAttribute = function(b) {
        return a.provider.getProperty(b, "resultOrderByAttribute")
    };
    a.provider.isResultOrderAscending = function(b) {
        return a.provider.getProperty(b, "isResultOrderAscending")
    };
    a.provider.getTextValue = function(b) {
        return a.provider.getProperty(b.label, "getTextValue")(b)
    };
    a.provider.getTextValue = function(b) {
        return a.provider.getProperty(b.label, "getTextValue")(b)
    };
    a.provider.getSemanticValue = function(b) {
        return a.provider.getProperty(b.label, "getSemanticValue")(b)
    };
    a.provider.getSVGPaths = function(b) {
        return a.provider.getProperty(b.label, "getSVGPaths")(b)
    };
    a.provider.isTextDisplayed = function(b) {
        return a.provider.getProperty(b.label, "getIsTextDisplayed")(b)
    };
    a.provider.getIsGroup = function(b) {
        return a.provider.getProperty(b.label, "getIsGroup")(b)
    };
    a.provider.getNodeDisplayType = function(b) {
        return a.provider.getProperty(b.label, "getDisplayType")(b)
    };
    a.provider.getImagePath =
        function(b) {
            return a.provider.getProperty(b.label, "getImagePath")(b)
        };
    a.provider.getImageWidth = function(b) {
        return a.provider.getProperty(b.label, "getImageWidth")(b)
    };
    a.provider.getImageHeight = function(b) {
        return a.provider.getProperty(b.label, "getImageHeight")(b)
    };
    a.provider.getDisplayResultFunction = function(b) {
        return a.provider.getProperty(b, "displayResults")
    };
    a.provider.DEFAULT_PROVIDER = Object.freeze({
        isSearchable: !0,
        returnAttributes: [a.query.NEO4J_INTERNAL_ID],
        valueOrderByAttribute: "count",
        isValueOrderAscending: !1,
        resultOrderByAttribute: null,
        isResultOrderAscending: !0,
        constraintAttribute: a.query.NEO4J_INTERNAL_ID,
        getPredefinedConstraints: function() {
            return []
        },
        getDisplayType: function(b) {
            return a.provider.NodeDisplayTypes.TEXT
        },
        getIsGroup: function(a) {
            return !1
        },
        getIsTextDisplayed: function(a) {
            return !0
        },
        getTextValue: function(b) {
            var c = a.provider.getProperty(b.label, "constraintAttribute");
            return (b.type === a.graph.node.NodeTypes.VALUE ? c === a.query.NEO4J_INTERNAL_ID ? "" + b.internalID : "" + b.attributes[c] : void 0 === b.value ? b.label :
                c === a.query.NEO4J_INTERNAL_ID ? "" + b.value.internalID : "" + b.value.attributes[c]).substring(0, a.graph.node.NODE_MAX_CHARS)
        },
        getSemanticValue: function(b) {
            var c = a.provider.getProperty(b.label, "constraintAttribute");
            return b.type === a.graph.node.NodeTypes.VALUE ? c === a.query.NEO4J_INTERNAL_ID ? "" + b.internalID : "" + b.attributes[c] : void 0 === b.value ? b.label : c === a.query.NEO4J_INTERNAL_ID ? "" + b.value.internalID : "" + b.value.attributes[c]
        },
        getImagePath: function(b) {
            if (b.type === a.graph.node.NodeTypes.VALUE) return "css/image/node-yellow.png";
            if (void 0 === b.value) {
                if (b.type === a.graph.node.NodeTypes.ROOT) return "css/image/node-blue.png";
                if (b.type === a.graph.node.NodeTypes.CHOOSE) return "css/image/node-green.png";
                if (b.type === a.graph.node.NodeTypes.GROUP) return "css/image/node-black.png"
            } else return "css/image/node-orange.png"
        },
        getImageWidth: function(a) {
            return 125
        },
        getImageHeight: function(a) {
            return 125
        },
        displayResults: function(b) {
            var c = b.data()[0],
                d = a.provider.getReturnAttributes(c.label),
                e = b.append("table").attr("class", "ppt-result-table");
            d.forEach(function(b) {
                var d =
                    b === a.query.NEO4J_INTERNAL_ID ? a.query.NEO4J_INTERNAL_ID.queryInternalName : b,
                    g = e.append("tr");
                g.append("th").text(function() {
                    return b === a.query.NEO4J_INTERNAL_ID ? "internal ID:" : b + ":"
                });
                void 0 !== c.attributes[d] && g.append("td").text(function(a) {
                    return a.attributes[d]
                })
            })
        }
    });
    return a
}();