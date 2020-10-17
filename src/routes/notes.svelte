<script lang="ts">
	import Amplify from '@aws-amplify/core';
	import aws_exports from '../aws-exports';
	import {listPosts} from '../graphql/queries';
	import {onCreatePost} from '../graphql/subscriptions';
	import { graphqlOperation } from 'aws-amplify';
	import callGraphQL from "../models/graphql-api";
	import subscribeGraphQL from "../models/graphql-api";
	import { Post } from '../models';
	import type { ListPostsQuery, OnCreatePostSubscription } from '../API';

	// in this way you are only importing Auth and configuring it.
	Amplify.configure(aws_exports);
	let posts: Post[];
	async function getPosts(){
		const result = await callGraphQL<ListPostsQuery>(graphqlOperation(listPosts));
		posts = result.data.listPosts.items;
	}
	getPosts();

  subscribeGraphQL<OnCreatePostSubscription>(
      onCreatePost
	).then((d)=>{
		posts.push(new Post({...d.data.onCreatePost, comments:[]}));
	});

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