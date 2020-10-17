<script lang="ts">
	// import Amplify from '@aws-amplify/core';
	// import aws_exports from '../aws-exports';
	// import {Post } from '../models/index';

	// // in this way you are only importing Auth and configuring it.
	// Amplify.configure(aws_exports);
	// let posts = Post[];
</script>
<svelte:head>
	<title>Notes</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="blog/{post.title}">{post.title}</a></li>
	{/each}
</ul>