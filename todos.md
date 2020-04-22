# TODOS

## Database

### Posts

- [ ] Post

  - [ ] route: `users/{userId}/posts/{postId}`
  - [ ] createdAt: `Date`
  - [ ] photos: `Photo`s collection
  - [ ] videos: `Video`s collection
  - [ ] comments: `Comment`s collection
  - [ ] Likes: `Like`s collection

- [ ] Photo

  - [ ] route: `users/{userId}/posts/{postId}/photos/{photoId}`
  - [ ] src: `string` (storage link)
  - [ ] thumbnail: `string` (either base 64 or storage link)
  - [ ] srcset: `string` (storage link)
  - [ ] alt: `string`

- [ ] Video

  - [ ] route: `users/{userId}/posts/{postId}/videos/{videoId}`
  - [ ] src: `string` (storage link)

- [ ] Comment

  - [ ] route: `users/{userId}/posts/{postId}/comments/{commentId}`
  - [ ] text: `string`
  - [ ] createdAt: `Date`
  - [ ] authorId: `uuid`

- [ ] Likes

  - [ ] route: `users/{userId}/posts/{postId}/likes/{likerId}`
  - [ ] `boolean` (value)

### Stories

- [ ] Story

  - [ ] route: `users/{userId}/stories/{storyId}`
  - [ ] photo: `Photo`
  - [ ] video: `Video`

- [ ] Photo

  - [ ] route: `users/{userId}/stories/{storyId}/photos/{photoId}`
  - [ ] src: `string` (storage link)
  - [ ] thumbnail: `string` (either base 64 or storage link)
  - [ ] srcset: `string` (storage link)
  - [ ] alt: `string`

- [ ] Video

  - [ ] route: `users/{userId}/stories/{storyId}/video/{videoId}`
  - [ ] src: `string` (storage link)

### Chats

- [ ] Chat

  - [ ] route: `chats/{chatId}`
  - [ ] messages: `Message`s collection

- [ ] Message

  - [ ] route: `chats/{chatId}/messages/{messageId}`
  - [ ] text: `string`
  - [ ] photos: `Photo`s collection
  - [ ] videos: `Video`s collection

- [ ] Photo

  - [ ] route: `chats/{chatId}/messages/{messageId}/photos/{photoId}`
  - [ ] src: `string` (storage link)
  - [ ] thumbnail: `string` (either base 64 or storage link)
  - [ ] srcset: `string` (storage link)
  - [ ] alt: `string`

- [ ] Video

  - [ ] route: `chats/{chatId}/messages/{messageId}/videos/{videoId}`
  - [ ] src: `string` (storage link)

### Following

- [ ] Following
  - [ ] route: `users/{userId}/following/{userToFollowId}`
  - [ ] `boolean` (value)

### Followers

- [ ] Followers
  - [ ] route: `users/{userId}/followers/{followerId}`
  - [ ] `boolean` (value)

### (User available) Chats

- [ ] Chats
  - [ ] route: `users/{userId}/chats/{chatId}`
  - [ ] `boolean` (value)

### Users

- [ ] posts: `Post` collection
- [ ] stories: `Story` collection
- [ ] chats: `Chat` collection
- [ ] following: `Following` collection
- [ ] followers: `Followers` collection
<!-- Credentials -->
- [ ] isPrivate: `bool`
- [ ] isAdmin: `bool`

## Pages

- [ ] Welcome page
- [ ] Sign In
- [ ] Sign Up
- [ ] Home
- [x] Profile
- [x] Post
- [ ] Comments
- [ ] Chat List
- [ ] Chat Room
- [ ] Search & Discover
- [ ] User settings

## PWA

- [ ] Theme
- [ ] Icon
- [ ] Manifest
- [ ] Stale while revalidate

## Features

- [x] Lazy load images
- [ ] Serve appropriately sized images
- [ ] Optimise uploaded images
- [ ] Reply to messages
- [ ] Delete specific photo(s)/video(s) from posts with multiple ones

## Themes

### Background

`#28313b -> #485461`
background-color: #485461;
background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);

`#414141 -> #000000`
background-color: #000000;
background-image: linear-gradient(315deg, #000000 0%, #414141 74%);

`#434343 -> #000000`
background-color: #000000;
background-image: linear-gradient(147deg, #000000 0%, #434343 74%);

`#2C3E50 -> #000000`
background-color: #000000;
background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);

`#000000 -> #2D3436`
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);

### Foreground

`#e0c3fc -> #8ec5fc`
background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

`#fa709a -> #fee140`
background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);

`#37ecba -> #72afd3`
background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);

`#FFC796 -> #FF6B95`
background-image: linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);

background-image: linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%);

background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);

background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);

background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);

background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);

background-image: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);

background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
