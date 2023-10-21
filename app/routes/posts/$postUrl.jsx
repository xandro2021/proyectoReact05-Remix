import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/models/posts.server';

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPost(postUrl);

  if (post.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Entrada no encontrada',
      data: {}
    })
  }

  return post;
}

function Post() {
  const post = useLoaderData();
  console.log(post);

  return (
    <div>Desde $postUrl</div>
  );
}

export default Post;
