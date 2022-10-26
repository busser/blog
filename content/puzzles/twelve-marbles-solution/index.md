---
title: "Twelve marbles: solution"
date: 2022-10-19
slug: "twelve-marbles-solution"
description: "Weighing the pros and cons"
draft: false
puzzles/tags:
  - solution
  - logic
  - easy
math: false
toc: false
---

Statement: [Twelve marbles]({{< ref "puzzles/twelve-marbles/index.md" >}}).

We begin with no information about any of the individual marbles' weights.

![](images/100-initial-situation.drawio.svg)

If we compare two groups of marbles, the scale will tell us which group is
heavier. We can start by comparing half of the marbles to the other half:

![](images/101-first-weighing.drawio.svg)

One of the groups must contain the crystal marble, which is heavier, so the
scale must lean to one side:

![](images/102-first-weighing-result.drawio.svg)

The heavier group must contain the crystal marble and the lighter group must
contain only glass marbles. We can rule out the lighter group as suspects:

![](images/103-first-weighing-analysis.drawio.svg)

The crystal marble must be among the six marbles that remain. Lets split those
into two groups and compare them:

![](images/104-second-weighing.drawio.svg)

Again, one of the groups must contain the crystal marble, so the scale must lean
to one side:

![](images/105-second-weighing-result.drawio.svg)

This allows us to rule out three more marbles as being definitely glass:

![](images/106-second-weighing-analysis.drawio.svg)

With three suspects left, we can compare one to another, with the third off the
scale:

![](images/107-third-weighing.drawio.svg)

If the crystal marble is on the scale, then it will lean to one side. If the
crystal marble is off the scale, then it will stay even. So we have two possible
results:

![](images/108-third-weighing-result-lean.drawio.svg)

Or:

![](images/109-third-weighing-result-even.drawio.svg)

If the scale leans, then we know the heavier marble is the crystal one:

![](images/110-third-weighing-analysis-lean.drawio.svg)

If the scale stays even, then both marbles on it have the same weight, which is
only possible if both are glass. By elimination, the crystal marble must be the
one we put aside:

![](images/111-third-weighing-analysis-even.drawio.svg)

Either way, we found the crystal marble using the scale only three times.
