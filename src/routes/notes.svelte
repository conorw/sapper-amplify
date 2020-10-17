<script lang="ts">
 	import {listBlogs, listPosts} from '../graphql/queries';
 	import {onCreatePost} from '../graphql/subscriptions';
 	import { API, graphqlOperation } from 'aws-amplify';
 	import callGraphQL from "../models/graphql-api";
	 import subscribeGraphQL from "../models/graphql-api";
	 //import { Schema } from '@aws-amplify/datastore';
	import type { Blog, Post } from '../models';
	import type { ListBlogsQuery, ListPostsQuery, OnCreatePostSubscription } from '../API';

	// in this way you are only importing Auth and configuring it.
	let posts: any[] = [];
	async function getPosts(){
		//const result = await callGraphQL<ListBlogsQuery>(graphqlOperation(listBlogs));
			const result = await API.graphql(graphqlOperation(listBlogs));
			// posts = result.data.listBlogs.items;
	}
	getPosts();

//   subscribeGraphQL<OnCreatePostSubscription>(
//       onCreatePost
// 	).then((d)=>{
// 		posts.push(new Post({...d.data.onCreatePost, comments:[]}));
// 	});

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
		<li><a rel="prefetch" href="posts/{post.title}">{post.title}</a></li>
	{/each}
</ul>