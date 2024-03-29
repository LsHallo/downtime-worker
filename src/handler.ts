export async function handleRequest(request: Request): Promise<Response> {
  const headers = new Map(request.headers);
  const auth_token = headers.get('x-auth');

  if(auth_token !== undefined && auth_token === WEB_AUTH) {
    const event = headers.get('x-event') || 'undefined';
    const name = headers.get('x-service-name') || 'undefined';
    const tags = headers.get('x-tags');

    const payload: Record<string, string> = {
      chat_id: TELEGRAM_CHAT_ID,
      text: `The check ${name} has gone ${event}!${tags!==undefined?'\n\nTags: '+tags:''}`
    }
    const formBody = Object.keys(payload).map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])
    ).join('&');
    const sendResult = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_KEY}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }
    );
    if(sendResult['ok']) {
      return new Response('Message sent.');
    } else {
      return new Response(`Failed to send message.<br> ${sendResult.toString()}`);
    }
  } else {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow'
      },
      statusText: 'Unauthorized'
    });
  }
}
