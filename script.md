
# Generating static sites with Angular and Scully
<english keyboard>
<checkout branch step-0>
The links to the source code, the apis and the documentation I'm going to reference are going to be in the list of links at the end 
of the video and in the notes so remember to check those out

Ok.

<left/browser/demo>
This is a quick Angular project I've just built. 
It was generated with Angular CLI and I'm running the local development server 
as you can see in the URL
It has two main components
On the first one, the list, you can see a list of Pokemon
When you click on one of them
<click on one>
It takes you to the view component, passing along the id, right here (click url)
and it shows you some data for that specific pokemon
The data I'm using comes from PokeAPI
<next tab/pokeapi>
, which is really fun for demos.
It doesn't require to sign up or create an apiKey, so it's really easy to get started


<close pokeapi tab>

<editor/list.html>

You can see the list template here.
Notice that there's some text indicating when we're loading data. 

Let's follow that 

<source/observable>
<list.ts>

And you can see that it's coming from this service
<source>
<service.ts>

which is just a wrapper for the PokeAPI

Here are the two requests we need, one to get a list of pokemon
and one to get data about a single pokemon

<left/browser/demo>

Let's take a look at the performance of this project before we do anything about it

I want to show you what it feels to open this page for the first time when you're on a slow network.
Not all of your users are going have the same great connectivity that you and have have right now,
so, as developers, we need to be mindful of we use the resources available.


Let's open the devtools
<devtools>
and go to the network tab
<network >

Since I want to experiment how the browser behaves when it loads this page for the first time, 
I'm going to disable the cache
<click>
I'm also going to throttle down my speed to the one of a Fast 3G network. 
<click> 
Let's see how "fast" this demo loads

I'm going to reload the page. Watch the network panel with me
<reload>

Okay, that is taking a long time.
We can actually see the scripts downloading but the page is still blank

When you build the project in production mode, Angular reduces de size of these scripts a lot, so it won't be as slow.

However, running this test already highlighted our biggest problem: the page is blank until the scripts
are done downloading, parsing and executing.

Let's take a better look and this issue by profiling our page.
<performance panel>
Let's click here, "start profiling and reload page"
<click>
Now the profiler is analysing the execution process until our page loads. 
Let's give it a few of seconds.

This strip right here shows you screenshots of your page over time.
You can see how it starts blank, and we have to wait until this big file right here is downloaded to see the first content rendered by Angular

We can improve the user experience by a lot if we pre-rendered our routes, so the HTML layout is delivered to the browser before the scripts are loaded.

Let me show you what I mean.
<devtools/DOM>
This is the DOM tree
Pre-rendering a route is just looking at the DOM content of the page when it's loaded, and saving a copy in a regular HTML file
<point scripts>
You can see this DOM includes everything in the page, including the scripts that load your dependencies and your Angular project
<right/pokemon/index.html>
This file, pokemon/index.html could be served by your HTTP server when a user visits the /pokemon URL
When this page is rendered by the browser, the HTML layout will be there FIRST, before the scripts have to be downloaded and executed.

It would be painful to do this manually every time our project changes, so we're going to use a new tool for that, Scully

<left/browser/scully>

Scully does what we just did right now: it starts a development server, navigates to each route in your project, and then saves the static HTML into a file
It's still in development, but it already does most of the things we need.

<right/editor/terminal>
Let's add the scully dependency to our Angular CLI project
let's run
ng add @scullyio/init
<enter>

This Angular schematic will add the dependency, update our application module and add configuration file for Scully
<config>
You can see the config is pretty basic, but it's already filled out with the settings for our project

<terminal>
So we want to run Scully, but before we do it, we need to build our app.
Let's run
yarn run build --prod

That will compile our app to version optimised for production 
which will result in a smaller bundle size and faster execution time

And now we can run Scully
Let's run
yarn run scully

The first time you run Scully it will take some extra time, but after that, you can see it only takes a few seconds to go run
<scroll to Route rendered into file>

You can see Scully looked at the root path, /, and the path it gets redirected to, /pokemon
Each of those paths has been rendered into these files

<open dist/static/index.html>
format
Here's the HTML copied from the DOM by Scully.
You can see the list with the links, the title, the scripts, everything's in here

<open tree dist/static>
  
Here are the generated files. These are the files you end up deploying to your web server.
You can see how the path structure matches the routes in the project.

You can also see that we're missing a route, the view for a single pokemon which is /pokemons/view/ and then the pokemon name, which is their ID
Let's check the output from Scully again
<terminal>
<scroll to warning>

And right here we can see the issue, Scully is complaining about this route, because it doesn't know how to handle it.
Scully uses your routing modules to figure out the routes defined in your application, and not the links in your HTML.
That means that for Scully to pick up changes in your app routing, you need to build your project before running Scully.
Let's take a look at the app routing module
<app routing>
Here we have these two URLs that we've seen before, the root URL which is redirecting to /pokemons
And this path starting with /pokemons, handled by the PokemonsModule
And if we go into that one
<pokemon routing>
Here we can see the list, and the view. That's how Scully knows which routes to navigate to.
The problem is that we don't know how many different IDs that url could use here <highlight ID>, so Scully doesn't know what to do.

<lft/browser/route plugin docs>

Scully has a pretty good solution for this case, and it's documented right here.
We can see how to write a pluging that tells Scully how to handle these kinds of routes, so we're going to implement one
Let's go into the config
<right/scully config>

And implement our plugin real quick

EDIT CUT

<right/sourcetree>
<switch to step-2>
<left editor/config>
<scroll to bottom scully config>

That was quick, huh?
I've added a route definition here, and this object is the route configuration which gets passed to the plugin

<select registerPl>

You can see here I'm calling this function from Scully to tell it there's a plugin to deal with routes matching this type.

And here you can see, typeName is just a string

and the plugin implementation is kinda short

<cursor L12>
the first thing I'm doing is get the list of pokemon from the API

<cursor L17>

and now I'm mapping every result into a configuration for the route.
We only need this route property to be a string representing the URL we want to navigate to.

I'm using this helper function from Scully that uses whatever URL the route had 
<highlighit L 15 after =>
and replaces the first variable argument with the name from the item
<highlight L19 item.name>

And that's it, we're ready to run Scully again.
<terminal>
Let's run
yarn run scully

Give it a second...
And here's the new output. We can see these new routes that have been generated by our plugin.
I love using this. It's a really powerful way of handling dynamic routes.
And if we go into the file structure
<explorer dist/static/pokemon>
We can see how these new directories and files have been generated for us. That's so cool

Let's check the result and see if it works

First, we need a local http server for our static files
<terminal>
let's run
yarn add --dev httpster (like hipster, almost)
<enter>

And now let's add a couple of scripts to our package.json
<package.json>

EDIT CUT
<right/sourcetree>
<switch to step-3>

These commands start a new server, one on port 3333 with the code generated by angular
and one on port 4444 with the pre-rendered files generated by Scully

<terminal/serve:static>
let's run 
yarn run serve:static

<terminal/serve:dist>
and at the same time, run
yarn run serve:dist

Let's get to the browser and compare performance of the two different approaches

<left/browser/3333>
This is the code that was generated by angular.
In a second, we are going to profile this page again and compare it with the pre-rendered version.
There's a small issue with the Chrome profiler though, since it doesn't clear the page before triggering the reload, 
so the first screenshots it takes are actually from the page we're looking at it right now.
To get around this, I'm going to clear the page myself and change the background color so we can see clearly which screenshots we should ignore after running the profiler

okay, now let's make sure we test under the same conditions
<devtools/network>
no caching, fast 3g network
and now back to our profiler
<devtools/perf>
, let's run it
<click run>

And now we can see here in the screenshot time how these first screens have nothing to do with this execution, 
it's just what was in the browser before it started rendering our page

And here we can se clearly how the page is blank, because our code hasn't been downloaded yet, and there's nothing in our DOM
Next we can see the title, when Angular has rendered the first, outer-most component
And here you can see the loading text, at this point we still don't have any meaningful data
And finally, after a good chunk of time, here's our list

Let's now compare with the pre-rendered version
<next tab 4444>

Same thing. First let's clear the page so we don't get confused by the screenshots
and now let's make sure we test under the same conditions
<devtools/network>
no caching, fast 3g network
back to the profiler
<devtools/perf>
let's run iiiit
<click run>

This looks muuuch different.
Look at that first screenshot. 
boom. 
the entire thing is read for the user. 
Let's take a look at this, however.
You can see the page goes into the loading text
This is because Angular is now running and going through the component lifecycle. 
It's loading the data at runtime and updating the component as it does.
There's different ways of solving this by telling Angular which state we already know about, 
but in the case of this project, we can do even better


You probably have worked in a similar project before. 
I don't mean a project about pokemon, I mean a project where the result is just HTML and CSS.

We don't really need Angular running after the data has been loaded and the components have been rendered
If we went into our pre-rendered HTML files 
<right/static/index.html>
and removed the scripts loading our code,
<select and remove> 
the HTML getting to the client would be exactly the same
<left/browser>
and the render performance would be exactly we just saw here, up until the point where Angular kicked in, here

<left/browser/post>
Since Scully is pretty awesome, it also has a system for plugins that run after your code is rendered
In this great post by Sam he talks about how to use a plugin to do what we want: 
remove Angular from our pre-rendered files

<right/terminal>
Let's add Sam's plugin as a dependency
yarn add scully-plugin-disable-angular

EDIT CUT
<right/sourcetree>
<switch to step-4>

Let's now go into the scully config
<left/editor/scully>
 We just have to import the plugin and add it to the list of plugins runs by default after pre-rendering our routes
 
 We need to do one more thing
 <package.json>
 In order to know which scripts were generated by angular, we need to pass an extra flag to the Angular CLI
 I just added another script to run the build process optimized for production, including also the --stats-json flag
 When we rung this build script, Angular CLI will generate a JSON file with a list of assets.
 <open stats, format>
 Sam's plugin uses this list to decide which scripts can be safely removed from our pre-rendered files
 
 <terminal>
okay, now we're set for one more build and Scully run
let's run
yarn build:prod

EDIT CUT
and now let's run Scully again

EDIT CUT

And let's get back to the browser
<left/4444>

This is the static version of our site generated by Scully
Let's clear the page again
And let's run our profiler once more
<run it>

And here you go, no more Angular in our static page and everything is rendered as fast as technically possible

<left/browser/github>

You can find the code for this demo and the links for this video on github.com/orestes     
