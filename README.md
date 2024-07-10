## Making the Solar System Local

This is a version of [Solar System Github Actions](https://github.com/kodekloudhub/github-actions-solar-system) repo that's been adapted to run locally using [the act utility](https://github.com/nektos/act), a very cool widget that runs Github Action workflows on your local system.  

It has some limitations, but fewer than you'd think.  You'll need to:

* Put your variables in a .vars file
* Put your secrets in a .secrets file
* Have a local docker server, e.g., Docker Desktop.

My workflow with act looks like this:

1. Make changes on my local branch and copy.
2. Check in the branch and push it to github
3. Run act.  My invocation looks like this:
   
   ```
   act --artifact-server-path ./artifact
   ```
4. That's pretty much it. 

### Changes to Solar System

Since I was trying to debug course related problems in order to help support the course for KodeKloud, I ended up updating the javascript app to run as modules (easier for me to debug) and created a docker container of the app that I could use as a service.  Since act handles vars and secrets by using dot files (and does not understand GitHub environments), my vars and secrets are:

* `.vars`: These are used by my docker container
  * MONGO_USERNAME=student
  * MONGO_URI="mongodb://127.0.0.1:27017/planets?directConnection=true"
* `.secrets`: 
   * MONGO_PASSWORD: secret you want the Mongo container to use.
   * KUBE_CONFIG: a kubeconfig that points to a k8s cluster that the local cluster can see.  This needs to be any IP address *except* 127.0.0.1, since act uses this in its run container. And the azure plugins are annoyingly picky as to the format of it. What worked for me:
   
   ```bash
    export FORMATTED=$(kubectl config view --raw \
      -o json | jq -c | sed 's/"/\\"/g' )
    echo KUBE_CONFIG=\"$FORMATTED\"
   ```
   

 
