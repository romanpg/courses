import { Accounts } from "meteor/accounts-base";
import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Index, MinimongoEngine } from 'meteor/easy:search';






/// routing

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
	this.render('navbar', {
	to:"navbar"
  	});
  	this.render('searchBox', {
	to:"search"
  	});
  	this.render('website_form', {
    to:"form"
  	});
	this.render('website_list', {
    to:"main"
  	});
});

Router.route('/detail/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('detail', {
    to:"main",
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
});



/// accounts config

Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});



/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort:{ratingUp:-1, ratingDown:1}});
	}
});


/////
// template events 
/////

Template.website_item.events({
	"click .js-upvote":function(event){
		var website_id = this._id;

		if (Meteor.user()){
			Websites.update({_id:this._id},
                {$set: {ratingUp:this.ratingUp+1}});
		}else{
			alert("You have to be a member to vote");
		}
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		if (Meteor.user()){
			Websites.update({_id:this._id},
                {$set: {ratingDown:this.ratingDown+1}});
		}else{
			alert("You have to be a member to vote");
		}

		return false;// prevent the button from reloading the page
	}
})

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
		
		}, 
	
	
	"submit .js-save-website-form":function(event){
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);
			
		if (Meteor.user()){
			Websites.insert({
    			title:event.target.title.value, 
    			url:event.target.url.value, 
    			description:event.target.description.value, 
    			ratingUp: 0, 
            	ratingDown: 0,
    			createdOn:new Date().toUTCString()
			});
		}else{
			alert("Become a member to add new websites");
		}

	}
});

Template.detail.events({

	"click #btn-comm":function(event){
		if (Meteor.user()){
			if($("#comment").val()){
				Websites.update({_id:this._id},
                {$push: {comment: {com: $("#comment").val(), user: Meteor.user().username, date: new Date().toUTCString()} }});
			}else{
				alert("The textarea is empty");
			}
		}else{
			alert("You have to be a member to comment");
		}

	},
	"click .js-upvote":function(event){
		var website_id = this._id;

		if (Meteor.user()){
			Websites.update({_id:this._id},
                {$set: {ratingUp:this.ratingUp+1}});
		}else{
			alert("You have to be a member to vote");
		}

		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		if (Meteor.user()){
			Websites.update({_id:this._id},
                {$set: {ratingDown:this.ratingDown+1}});
		}else{
			alert("You have to be a menber to vote");
		}

		return false;// prevent the button from reloading the page
	}
});


Template.searchBox.helpers({
  webIndex: function () { 
  	return WebIndex; 
  },
});

