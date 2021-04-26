***
# NOTICE:

## This repository has been archived and is not supported.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***
NOTICE: SUPPORT FOR THIS PROJECT HAS ENDED 

This projected was owned and maintained by Walmart. This project has reached its end of life and Walmart no longer supports this project.

We will no longer be monitoring the issues for this project or reviewing pull requests. You are free to continue using this project under the license terms or forks of this project at your own risk. This project is no longer subject to Walmart's bug bounty program or other security monitoring.


## Actions you can take

We recommend you take the following action:

  * Review any configuration files used for build automation and make appropriate updates to remove or replace this project
  * Notify other members of your team and/or organization of this change
  * Notify your security team to help you evaluate alternative options

## Forking and transition of ownership

For [security reasons](https://www.theregister.co.uk/2018/11/26/npm_repo_bitcoin_stealer/), Walmart does not transfer the ownership of our primary repos on Github or other platforms to other individuals/organizations. Further, we do not transfer ownership of packages for public package management systems.

If you would like to fork this package and continue development, you should choose a new name for the project and create your own packages, build automation, etc.

Please review the licensing terms of this project, which continue to be in effect even after decommission.

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
