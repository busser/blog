---
title: "Twelve coins: solution"
date: 2022-10-19
slug: "twelve-coins-solution"
description: "Weighing the pros and cons"
draft: false
puzzles/tags:
  - solution
  - logic
  - easy
math: false
toc: false
---

Statement: [Twelve coins]({{< ref "puzzles/twelve-coins/index.md" >}}).

We begin with no information about any of the individual coins' weights.

![](images/100-initial-situation.drawio.svg)

If we compare two groups of coins, the scale will tell us which group is
heavier. We can start by comparing half of the coins to the other half:

![](images/101-first-weighing.drawio.svg)

One of the groups must contain the fake coin, which is heavier, so the scale
must lean to one side:

![](images/102-first-weighing-result.drawio.svg)

The heavier group must contain the fake coin and the lighter group must
contain only real coins. We can rule out the lighter group as suspects:

![](images/103-first-weighing-analysis.drawio.svg)

The fake coin must be among the six coins that remain. Lets split those into
two groups and compare them:

![](images/104-second-weighing.drawio.svg)

Again, one of the groups must contain the fake coin, so the scale must lean to
one side:

![](images/105-second-weighing-result.drawio.svg)

This allows us to rule out three more coins as being definitely real:

![](images/106-second-weighing-analysis.drawio.svg)

With three suspects left, we can compare one to another, with the third off the
scale:

![](images/107-third-weighing.drawio.svg)

If the fake coin is on the scale, then it will lean to one side. If the fake
coin is off the scale, then it will stay even. So we have two possible results:

![](images/108-third-weighing-result-lean.drawio.svg)

Or:

![](images/109-third-weighing-result-even.drawio.svg)

If the scale leans, then we know the heavier coin is the fake one:

![](images/110-third-weighing-analysis-lean.drawio.svg)

If the scale stays even, then both coins on it have the same weight, which is
only possible if both are real. By elimination, the fake coin must be the one we
put aside:

![](images/111-third-weighing-analysis-even.drawio.svg)

Either way, we found the fake coin using the scale only three times.
