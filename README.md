README is a work in progress.

# Thorax Boilerplate Projects

[Thorax](http://thoraxjs.org/) boilerplate projects.

All projects include [Bootstrap](http://twitter.github.com/bootstrap/). All projects include [jQuery](http://jquery.com) except the mobile project which uses [Zepto](http://zeptojs.com).

## Shared Structure

All projects will create an `Application` object which is a `Thorax.ViewController`.

All projects share a similar file structure, though the location of the JavaScript assets and templates differs.

- collection.js
- collections
- init.js
- lib
- model.js
- models
- view-controller.js
- view-controllers
- view.js
- views

## Standalone

All of 

## Thorax Standalone Project

This 

## Thorax + Lumbar for NodeJS Project

## Thorax for Rails Project

All of the 


TODO: add details on file structure
TODO: add documentation on how to setup a separate hello-world router


## Thorax.Application

A subclass of `Thorax.ViewController` usually created just once. The Application object automatically subclasses the following classes for you:

- LayoutView
- View
- Model
- Collection
- Router
- ViewController

Making them available on the `Application` object, for instance `Application.View`. The following registry methods are also aliased on the `Application` object:

- template
- view
- model
- collection
- router

A simple hello world example:

    var Application = new Thorax.Application();
    Application.start();
    Application.setView(new Application.View({
      template: "Hello World!"
    }));
    $("body").append(Application.el);

### start *application.start([options])*

Calls `Backbone.history.start` with the given `options` and then fires a `ready` event on the application object.
