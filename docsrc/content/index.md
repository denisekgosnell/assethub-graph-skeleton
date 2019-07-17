---
title: Be a good citizen and create documentation
type: index
weight: 0
---

##  Main Purpose
### The main objective of this asset is to ....


##  Introduction
### High Level Overview
This asset ...

### Business Takeaways
Why did you build this?

### Technical Takeaways
How awesome is your technical example? Tell us!

#### Schema

**Generated Vertex Labels**

* **person**: the total number of persons determines the baseline volume for the generated graph
* **account**: will have the same total vertices as person vertices

**Generated Edges**

* **ownsAccount**: a person owns a financial account.  The final count of ownsAccount edges will be the same number of account vertices.

#### Data Generation
This asset uses EngineBlock (EBDSE) to generate synthetic data. The graph is generally created in the following order:

1. Create the graph schema
2. Insert all people and account vertices
3. Connect every person to an account

The full process and usage of EBDSE for data generation [can be found here.](link to your asset on github)


### DSE Usage
What features of DSE are you showing off?

## Additional Resources

### Externally Sharable:

*  ...

### Internal Only:

* ...