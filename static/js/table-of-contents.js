// Transition smoothly to anchor when user clicks on table of contents.
document
  .querySelectorAll('#TableOfContents li a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

// Draw "snake" path next to table of contents.
window.addEventListener("DOMContentLoaded", () => {
  var tableOfContents = document.querySelector("#TableOfContents");
  var tableOfContentsPath = document.querySelector("#toc-marker path");

  const TOP_MARGIN = 0.05,
    BOTTOM_MARGIN = 0.05;

  // Shared variables for caching.
  var tableOfContentsItems = [];
  var pathLength;
  var previousPathStart;
  var previousPathEnd;

  window.addEventListener("resize", makePath, false);
  window.addEventListener("resize", updatePathVisibility, false);
  window.addEventListener("scroll", updatePathVisibility, false);

  makePath();
  updatePathVisibility();

  function makePath() {
    // First, build a list of each item in the table of contents.
    // For each item, take note of its target heading.
    tableOfContentsItems = [...tableOfContents.querySelectorAll("li")].map(
      (item) => {
        var anchor = item.querySelector("a");
        var link = anchor.getAttribute("href");
        var target = document.getElementById(link.slice(1));

        return {
          item: item,
          anchor: anchor,
          target: target,
        };
      }
    );
    // .filter((item) => !!item.target);

    // Then, build the path's SVG based on the items in the list.
    var pathCode = [];
    var previousX;
    tableOfContentsItems.forEach((item, i) => {
      var x = item.anchor.offsetLeft - 5;
      var y = item.anchor.offsetTop;
      var height = item.anchor.offsetHeight;

      if (i == 0) {
        // Start the path with a vertical line.
        pathCode.push("M", x, y);
        pathCode.push("L", x, y + height);

        // Take note of the first item's indentation level.
        previousX = x;

        // Update the path and take note of where the path starts and ends
        // for the first item.
        tableOfContentsPath.setAttribute("d", pathCode.join(" "));
        item.pathIntervalStart = 0;
        item.pathIntervalEnd = tableOfContentsPath.getTotalLength();

        return;
      }

      // This is a subsequent step in the path.

      // If there is a change in indentation level, draw a horizontal line.
      if (previousX != x) {
        var previousY = pathCode[pathCode.length - 1];
        pathCode.push("L", previousX, (previousY + y) / 2);
        pathCode.push("L", x, (previousY + y) / 2);
      }

      // Take note of the current item's indentation level.
      previousX = x;

      // Prolong the path to the start of the current item.
      pathCode.push("L", x, y);

      // Update the path and take note of where the path starts
      // for the current item.
      tableOfContentsPath.setAttribute("d", pathCode.join(" "));
      item.pathIntervalStart = tableOfContentsPath.getTotalLength();

      // Prolong the path with a vertical line next to the current item.
      pathCode.push("L", x, y + height);

      // Update the path and take note of where the path ends for the current item.
      tableOfContentsPath.setAttribute("d", pathCode.join(" "));
      item.pathIntervalEnd = tableOfContentsPath.getTotalLength();
    });

    // Take note of path's total length to avoid recomputing it
    // when the user scrolls.
    pathLength = tableOfContentsPath.getTotalLength();
  }

  function updatePathVisibility() {
    // Determine top of each section (i.e. position of heading).
    tableOfContentsItems.forEach((item) => {
      item.sectionTop = item.target.getBoundingClientRect().top;
    });

    // Determine bottom of each section (i.e. top of next section).
    for (var [i, item] of tableOfContentsItems.entries()) {
      if (i < tableOfContentsItems.length - 1) {
        item.sectionBottom = tableOfContentsItems[i + 1].sectionTop;
      } else {
        item.sectionBottom = Infinity;
      }
    }

    // Determine which sections are visible.
    tableOfContentsItems.forEach((item) => {
      if (
        item.sectionTop < window.innerHeight * (1 - BOTTOM_MARGIN) &&
        item.sectionBottom > window.innerHeight * TOP_MARGIN
      ) {
        item.sectionVisible = true;
        item.anchor.classList.add("active");
      } else {
        item.sectionVisible = false;
        item.anchor.classList.remove("active");
      }
    });

    // Compute interval of path to make visible.
    var pathStart = pathLength;
    var pathEnd = 0;
    tableOfContentsItems.forEach((item) => {
      if (item.sectionVisible) {
        pathStart = Math.min(item.pathIntervalStart, pathStart);
        pathEnd = Math.max(item.pathIntervalEnd, pathEnd);
      }
    });

    // Update path visibility.
    if (pathStart < pathEnd) {
      if (pathStart != previousPathStart || pathEnd != previousPathEnd) {
        tableOfContentsPath.setAttribute("stroke-dashoffset", "1");
        tableOfContentsPath.setAttribute(
          "stroke-dasharray",
          "1, " + pathStart + ", " + (pathEnd - pathStart) + ", " + pathLength
        );
        tableOfContentsPath.setAttribute("opacity", 1);
      }
    } else {
      tableOfContentsPath.setAttribute("opacity", 0);
    }

    previousPathStart = pathStart;
    previousPathEnd = pathEnd;
  }
});
