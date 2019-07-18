# assethub-graph-skeleton

This is a skeleton repository for generating graph structured data with engine block and AssetHub at DataStax. There are four sections to this README:

A. [A Quick `startup.order` refresher](#startup)
B. [Files to Edit](#files)
C. [Mapping Variables Between Files](#variables)
D. [More Resources](#resources)

### <a name="startup"></a>A Quick `startup.order` refresher

A quick refresher on understanding ``.startup/startup.order`

There are four required items for creating an asset in AssetHub that generates graph structured data.

1. `hugo`

This startup script downloads and installs `hugo`. AssetHub use hugo for asset documentation.

2. `nomnoml`

The `nomnoml` startup script starts the server for documentation. Documentation is viewable on port `:1313`.

3. `ebdserun`

This startup script starts the data insertion process by calling `runebdse.sh`

4. `uploadNotebook`

The `uploadNotebook` startup script uses the Studio APIs and imports the `NotebookSkeleton.studio-nb.tar` to studio

### <a name="files"></a>Files to Edit

Most of your work will be in the following files:

1. `ebdse/runebdse.sh`

This file defines the size of your graph, different engine block variables, and engine block commands.

2. `ebdse/activities/driver.yaml`

This file contains the dse graph statements that engine block will execute.

3. `NotebookSkeleton.studio-nb.tar`

This an example notebook that posts at the end of the data generation process.

4. `docsrc/content/index.html`

This file is the asset specific documentation to view on port `:1313`.

### <a name="variables"></a>Mapping Variables Between Files

The bulk of the work is understanding how to translate variables defined in `runebdse.sh` over to `driver.yaml`. This section gives you a quick tour of the ones you will use the most.

1. `/tmp/ebdse/ebdse run yaml=driver`

The important piece here is `yaml=driver`. This indicates that the commands for `ebdse` are in `driver.yaml`

2. `tags=phase:create-graph`

This indicates which phase to execute in `driver.yaml`. This maps to the definition in your `driver.yaml` that looks like:
```
blocks:
- name: create-graph
  tags:
   phase: create-graph
```

3. nameofgraph=$graphname

This indicates which graph to alter. Above in runebdse.sh you set graphname=<<nameOfYourGraph>>

4. host=$host

This is configurable to be your local host or a node in your cluster.
Best options:
node0 (for working in a cluster)
localhost (for working locally)

5. cycles=$person

This indicates how many times the statement is supposed to be executed. In runebdse.sh, we defined person=500. This means that the statementn in driver.yaml under the phase take will be executed person number of times, or 500 times.
For schema and set-up related statements, we want cycles=1

6. All other variable=$variable statements

This is the key to passing variables over to ebdse executio statements. The variables you define in runebdse.sh can be passed as command line arguments with this syntax

### <a name="resources"></a>More Resources

1. [Complex Graph Structure Example](https://github.com/denisekgosnell/paths-graph-example/blob/master/ebdse/activities/paths.yaml)

2. [General EBDSE Documentation](https://powertools.datastax.com/ebdse/)

3. [All Data Generation Functions](https://powertools.datastax.com/ebdse/functions/autodoc_reference/)