# A02 Web Application Development Assignment

This is a mandatory assignment that you are supposed to solve on your own.

You need to do regular "commits" and "pushes" to the repo provided so that the course management is able to follow your work with the assignment.

You should be able to explain code constructions and how problems are solved.

This assignment will be examined during an oral exam and presentation of the final system.

## Introduction

In this assignment, you should implement the system that you have designed during [assignment A01](A01.md).

## Description of the system

The application is supposed to work as a notification hub and dashboard for a user's GitLab organizations. In the application, the user should be able to list and select his/her groups as well as receive notifications, for example, the latest releases, latest commits, etc. for repositories in the selected groups.

The application should be able to notify the user about certain events that occur in the various groups, even if the user is not running the application. This could, for instance, be solved using notifications sent to Slack, Facebook messenger, browser notifications, or SMS. Other alternatives could be discussed. The user should inside of the application be able to configure which group events will be sent as notifications in this way.

The user should be able to close the application and return at a later date. If so, the application should be able to show information that is new since the last execution.

The application should be deployed to/through a hosting service like [Digital Ocean](https://www.digitalocean.com/), [AWS](https://aws.amazon.com/), or [Azure](https://azure.microsoft.com).

​An [example mockup](https://wireframepro.mockflow.com/view/1dv612-mockup) is available. See this only as an example and not a requirement.

Do remember that the user who logs in using your application might have access to a log of groups on GitLab. Consider using a proper GUI layout for this, to deal with issues when the group and repo list becomes very long for a user.

Please contact the course management if you have questions about the system.

## Get going

This is how to get going with the assignment.

1\. You have a git repo on GitLab named "assignment", available below your lnu student acronym in the course at GitLab. Start of by cloning the repo to your computer ("xxx" is your lnu-username):

```
# Using ssh
git clone git@gitlab.lnu.se:1dv612/student/xxx/assignment.git
```

2\. Write your code in the repo, commit and push it to GitLab.

3\. You have a group on GitLab called "maintainer" where you have the role "maintainer" which is needed to create GitLab WebHooks. Use that group and create repos to which you may connect WebHooks. Use this setup to develop and test your application.

## Extra features

These are suggestions on extra features.

1. Learn and adapt new techniqes and technologies.To some extent it is expected that you adapt new learnings to solve this assignment. But using even more new technologies is harder and you should bring up these "new learnings" and explain your experience of the new tech you did use.

1. Write a new and separate document in your Wiki from A01, where you reflect back on the design you did in A01. Did you follow the design or did you make changes along the way when you implemented the project? Document your reflections and learnings of this. It is always good to look back and learn from what one did.

1. A good-looking and working application is always nicer to see than one that is not so. Feel free to put work and effort in making a nice, good looking application that has a good and intuitive user interface.

1. What is the most beneficial feature of your application, that you can think of, that shows you did put extra effort into the application. Explain the feature and tell a bit on why and how you did it.

1. Add extra effort to document your application and how to build and run it. Put this information into the README.md of your repo.

## Grading

This assignment is graded as A-F. These are a few notes on how your submission is graded.

### Grade E, D

Fulfill all mandatory features and requirements to a satisfactory level where they work as expected.

You might have tried to implement some of the optional features.

### Grade D, C

Your application and presentation has a high level of quality and feature fulfillment.

The outcome is visual appealing and has a high level of usability.

You have implemented and explained some optional/added feature.

### Grade B, A

Your application and presentation has an excellent level of quality, usability and fulfillment of all the features and their requirements.

You have implemented and explained a almost complete set of optional/added feature.

## Presentation

You are to record a video presentation of your project where you show how your project implements the features and fullfills the requirements. You should also present a few highlights from your source code and elaborate on why you feel the code is good/bad.

The video scene should contain a cam where your face is visible. Start your video by clearly stating your name, acronym and display an id card.

The tool OBS is a free and opensource tool you can use to record the presentation video.

The video should be 5-7 minutes.

You can save the video somewhere online and link to it. Services like YouTube, Dropbox, Google Docs provides for sharing not public video by links.

The teacher might reach out to you to ask for a oral examination, one-on-one, if deemed needed on a case by case.

## How to submit

This is how you submit your work.

1. Create an issue on your repo "assignment". Provide a link to the actual repo(s) where you have stored your source code for the project. Provide a link to where the application is hosted and can be tryed out live.

1. In the issue, write a few sentences on each optional requirement you have implemented. This will make it clear what optional features you tried to implement.

1. In the issue, attach a link to the presentation video.

1. In the issue, write a final personal reflection on your TIL for this part of the course.

1. Add a tag to the assignment repo, saying v1.0.0 or larger. If you make updates to the repo you should also add newer tags.

1. When you are ready to submit, assign the issue to your teacher.

What is a TIL? TIL is an acronym for "Today I Learned" which playfully indicates that there are always new things to learn, every day. You usually pick up things you have learned and where you might have hiked to a little extra about its usefulness or simplicity, or it was just a new lesson for the day that you want to note.

## Examination

The teacher will grade your submission and provide feedback in an issue on GitLab.
