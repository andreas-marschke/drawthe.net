var drawNotes = function (svg, drawing, notes, title) {

  var converter = new showdown.Converter({extensions: ['prettify']});
  converter.setOption('prefixHeaderId', 'notes-');

  var notes = svg.selectAll("notes")
    .data(d3.entries(notes))
    .enter()

  var notesg = notes.append("g")
    .attr("transform", function(d) { return "translate(" + diagram.xBand(d.value.x) + "," + diagram.yBand(d.value.y) + ")" })

  var noteFill = notesg
    .append("rect")
    .attr("rx", diagram.xBand.bandwidth() * .05)
    .attr("ry", diagram.yBand.bandwidth() * .05)
    .attr("width", function(d) { return diagram.xBand.bandwidth() + ((d.value.w -1 || 0) * diagram.xBand.step()) })
    .attr("height", function(d) { return diagram.yBand.bandwidth() + ((d.value.h -1 || 0) * diagram.yBand.step()) })
    .attr("id", function(d) { return d.key })
    .attr("fill", function(d) { return d.value.backgroundColor || "red" })
    .style("stroke", function(d) { return d.value.borderColor || "red" })

  var padding = Math.min(diagram.yBand.bandwidth() * .05, diagram.xBand.bandwidth() * .05)
  var noteTextDiv = notesg
    .append("foreignObject")
    .append("xhtml:div")
    .style("width", function(d) { return (diagram.xBand.bandwidth() + ((d.value.w -1 || 0) * diagram.xBand.step()))  + "px"})
    .style("height",  function(d) { return (diagram.yBand.bandwidth() - 2*padding + ((d.value.h -1 || 0) * diagram.yBand.step())) + "px"})
    .style('font-size', Math.min(diagram.yBand.bandwidth() * .125, diagram.xBand.bandwidth() * .125)  + 'px')
    .style('display', 'flex')
    .style('padding', `${padding}px`)
    .attr("class", "notes")
    .style("color", function(d) { return d.value.color || "white" })
    .style('flex-direction', function(d) { return d.value.flexDirection || "column" })
    .style('align-items', function(d) { return d.value.alignItems || "flex-start" })
    .style('justify-content', function(d) { return d.value.justifyContent || "flex-start" })
    .style('text-align', function(d) { return d.value.textAlign || "left" })
    .html( function (d) { return converter.makeHtml(d.value.text || "Missing text in note") })
}