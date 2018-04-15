// hog feature
// TnT doesn't have the features we need, so create ower own
export const hog_feature = tnt.board.track.feature()
  .index(function (d) {
    return d.id;
  })
  .create(function (new_hog, x_scale) {
    const track = this;
    const padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??
    // otherwise it is repeated with every create event

    const height = track.height() - ~~(padding * 2);
    const dom1 = x_scale.domain()[1];

    new_hog
      .append("line")
      .attr("class", "hog_boundary")
      .attr("x1", function (d) {
        const width = d3.min([x_scale(dom1 / d.max), height]);
        const x = width * (d.max_in_hog - 1);
        const xnext = width * d.max_in_hog;
        return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
      })
      .attr("x2", function (d, i) {
        const width = d3.min([x_scale(dom1 / d.max), height]);
        const x = width * (d.max_in_hog - 1);
        const xnext = width * d.max_in_hog;
        return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
      })
      .attr("y1", 0)
      .attr("y2", track.height())
      .attr("stroke-width", 2)
      .attr("stroke", "black");
  })
  .distribute(function (hogs, x_scale) {
    const track = this;
    const padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??

    const height = track.height() - ~~(padding * 2);
    const dom1 = x_scale.domain()[1];

    hogs.select("line")
      .transition()
      .duration(200)
      .attr("x1", function (d) {
        const width = d3.min([x_scale(dom1 / d.max), height]);
        const x = width * (d.max_in_hog - 1);
        const xnext = width * d.max_in_hog;
        return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
      })
      .attr("x2", function (d) {
        const width = d3.min([x_scale(dom1 / d.max), height]);
        // var x = x_scale((dom1/d.max) * d.max_in_hog);
        // var xnext = x_scale((dom1/d.max) * (d.max_in_hog + 1));
        const x = width * (d.max_in_hog - 1);
        const xnext = width * d.max_in_hog;

        return x + (xnext - x + width) / 2 + ~~(padding / 2) - 1;
      });
  });

export function hog_gene_feature(color) {
  const feature = tnt.board.track.feature();

  if (!color) {
    color = () => "grey";
  }

  feature.color = function(c) {
    if (!arguments.length) {
      return color;
    }
    color = c;
    return this;
  };

  feature
    .index(function (d) {
      return d.id;
    })
    .create(function (new_elems, x_scale) {
      const track = this;
      const padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??
      // otherwise it is repeated with every create event
      const height = track.height() - ~~(padding * 2);
      const dom1 = x_scale.domain()[1];

      new_elems
        .append("rect")
        .attr("class", "hog_gene")
        .attr("x", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          const x = width * d.pos;
          return x + padding;
        })
        .attr("y", padding)
        .attr("width", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          return width - 2 * padding;
        })
        .attr("height", height)
        .attr("fill", color);
    })
    .distribute(function (elems, x_scale) {
      const track = this;
      const padding = ~~(track.height() - (track.height() * 0.8)) / 2; // TODO: can this be factored out??
      // otherwise it is repeated with every create event
      const height = track.height() - ~~(padding * 2);
      const dom1 = x_scale.domain()[1];

      elems.select("rect")
        .transition()
        .attr("x", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          const x = width * d.pos;
          return x + padding;
        })
        .attr("width", function (d) {
          const width = d3.min([x_scale(dom1 / d.max), height]);
          return width - 2 * padding;
        });
    });

  return feature;
}
