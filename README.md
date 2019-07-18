# assethub-graph-skeleton

A skeleton repository for generating graph structured data with engine block and assethub at DataStax

### Understanding .startup/startup.order

Required items:
1. hugo

This downloads and installs hugo. We use hugo for asset documentation on port :1313

2. nomnoml

This starts the server for documentation

3. ebdserun

This step starts the data insertion process by calling runebdse.sh

4. uploadNotebook

uploadNotebook uses the Studio APIs and imports the NotebookSkeleton_2019-07-17_gosnell.studio-nb.tar to studio

### The files you need to primarily edit

Most of your work will be in the following files:

1. ebdse/runebdse.sh

This file defines the size of your graph, different engine block variables, and engine block commands.

2. ebdse/activities/driver.yaml

This file contains the dse graph statements that engine block will execute.

3. NotebookSkeleton_2019-07-17_gosnell.studio-nb.tar

This an example notebook that posts at the end of the data generation process.

4. docsrc/content/index.html

This file is the asset specific documenation to view on port :1313

### Translating variables from runebdse.sh over to driver.yaml

1. /tmp/ebdse/ebdse run yaml=driver

This indicates that the commands for ebdse are in driver.yaml

2. tags=phase:create-graph

This indicates which phase to execute in driver.yaml

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

