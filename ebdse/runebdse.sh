#!/bin/bash

set -x

#Vs
person=500 # the number of people vertices in your graph
account=250 # the number of account vertices in your graph

#Es
ownsAccount=500  # the number of edges between people and accounts
                 # In our model, every person has to own an account

# graph
graphname=test   # the name of your graph in datastax

#misc configurations for turning engine block
rate=10k
threads=64
host=node0       # you will want to set this as localhost (working locally) or node0 (in a cluster)
reads=100
#arg=-v

if [ $# -gt 0 ]; then
    echo $1
    host=$1
fi


# type is dsegraph, cql, or sparksql (workload type)
# yaml the name of your yaml in ./activities/
# tags help you design which block from the yaml to run (user defined in the yaml)
# cycles can be a number (1M) or a range (10..100000) how many times to run
# host - a dse node
# nameofgraph is a <<>> pointy bracket thing in the yaml
# you are not allowed to provide a graphname argument in the create call

# ### 1. CREATE THE GRAPH #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver tags=phase:create-graph cycles=1 host=$host nameofgraph=$graphname

# ### 2. PRODUCTION MODE #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver graphname=$graphname tags=phase:prod-mode cycles=1 host=$host

# ### 3. CREATE THE SCHEMA #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver graphname=$graphname tags=phase:graph-schema cycles=1 host=$host

# ### 4. CREATE PEOPLE VERTICES #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver graphname=$graphname tags=phase:insert-person-vertices cycles=$person cyclerate=$rate host=$host threads=$threads person=$person

# ### 5. CREATE ACCOUNT VERTICES #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver graphname=$graphname tags=phase:insert-account-vertices cycles=$person cyclerate=$rate host=$host threads=$threads account=$account

# ### 6. CREATE EDGES #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver graphname=$graphname tags=phase:add-ownsAccount-edge cycles=$person cyclerate=$rate host=$host threads=$threads account=$account person=$person

# ### 7. TURN ON ANALYTICS QUERIES #####
/tmp/ebdse/ebdse run type=dsegraph yaml=driver graphname=$graphname tags=phase:queries-enabled cycles=1 host=$host
