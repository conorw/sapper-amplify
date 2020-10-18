<script lang="ts">
	 import {listBlogs, listPosts} from '../graphql/queries';
	 import {createBlog} from '../graphql/mutations';
	 import {onCreateBlog, onCreatePost} from '../graphql/subscriptions';
	 import * as Observable from "zen-observable";
 	import { API, graphqlOperation } from 'aws-amplify';
 	import callGraphQL, { SubscriptionValue } from "../models/graphql-api";
	 //import { Schema } from '@aws-amplify/datastore';
	import { Blog, Post } from '../models';
	import type { ListBlogsQuery, ListPostsQuery, OnCreateBlogSubscription, OnCreatePostSubscription } from '../API';

	// in this way you are only importing Auth and configuring it.
	let posts: any[] = [];
	async function getBlogs(){
		//const result = await callGraphQL<ListBlogsQuery>(graphqlOperation(listBlogs));
			// const result = await API.graphql(graphqlOperation(listBlogs));
			const result = await callGraphQL<ListBlogsQuery>(listBlogs);
			posts = result.data.listBlogs.items;
	}

	async function subscribeToBlogs(){
		try {

			const subscription = API.graphql(graphqlOperation(onCreateBlog)) as any;
		// 	const subscription = await callGraphQL<OnCreateBlogSubscription>(onCreateBlog);
		// // const subscription: any = await API.graphql(
		// // 	graphqlOperation(onCreateBlog, {authMode: 'API_KEY'})
		// // );
		console.log(subscription);
			subscription.subscribe({
    next: (response: SubscriptionValue<OnCreateBlogSubscription>) => {
      //const todo = mapOnCreateTodoSubscription(response.value.data);
      console.log(response);
      // setTodos([...todos, todo]);
    },
  });;
		} catch (error) {
			console.log(error);
		}

	}

	subscribeToBlogs();

	async function addBlog(){
		//const result = await callGraphQL<ListBlogsQuery>(graphqlOperation(listBlogs));
			const result = await API.graphql(graphqlOperation(createBlog, {input: {name: 'test'}}));
	}
	addBlog();
	getBlogs();


</script>
<svelte:head>
	<title>Posts</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="posts/{post.name}">{post.name}</a></li>
	{/each}
</ul>