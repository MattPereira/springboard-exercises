from unittest import TestCase

from app import app
from models import db, User, Post, Tag

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        """Add sample user."""

        Tag.query.delete()
        Post.query.delete()
        User.query.delete()

        user = User(first_name="Bob", last_name="Belcher", img_url="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2657aed-7e3b-42cc-a30e-053044f97216/d91s02g-85331998-2e0a-4bc9-bbed-3286a149dad6.jpg/v1/fill/w_1024,h_1493,q_75,strp/bob_belcher__bob_s_burgers__7_by_frasier_and_niles_d91s02g-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ5MyIsInBhdGgiOiJcL2ZcL2YyNjU3YWVkLTdlM2ItNDJjYy1hMzBlLTA1MzA0NGY5NzIxNlwvZDkxczAyZy04NTMzMTk5OC0yZTBhLTRiYzktYmJlZC0zMjg2YTE0OWRhZDYuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pjvN6k_LoER7OWQ6naWbZ8v7ON7yNrYGSsRBMW8fjas")
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user = user

        post = Post(title="test post title", content="test content",
                    user_id=self.user_id)

        db.session.add(post)
        db.session.commit()

        self.post_id = post.id
        self.post = post

        tag = Tag(name='test tag')
        db.session.add(tag)
        db.session.commit()

        self.tag_id = tag.id
        self.tag = tag

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_home(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Blogly Recent Posts</h1>', html)

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Bob Belcher', html)

    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('>Bob Belcher</h1>', html)
            self.assertIn(self.user.img_url, html)

    def test_create_user(self):
        with app.test_client() as client:
            d = {"first_name": "Jimmy", "last_name": "Pesto", "img_url": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2657aed-7e3b-42cc-a30e-053044f97216/d8uyqcq-3167ee88-e826-4933-96f8-92d793002d4f.jpg/v1/fill/w_1024,h_1944,q_75,strp/jimmy_pesto__bob_s_burgers__by_frasier_and_niles_d8uyqcq-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTk0NCIsInBhdGgiOiJcL2ZcL2YyNjU3YWVkLTdlM2ItNDJjYy1hMzBlLTA1MzA0NGY5NzIxNlwvZDh1eXFjcS0zMTY3ZWU4OC1lODI2LTQ5MzMtOTZmOC05MmQ3OTMwMDJkNGYuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.f05GYBV4LvhBg70pdJcAy7tBz46YGUUi7pN6QHoi02E"}
            resp = client.post(f"/users/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('>Jimmy Pesto</a>', html)

    def test_show_edit_form(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}/edit")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('>Edit User</h1>', html)
            self.assertIn('value="Bob"', html)

    def test_update_user(self):
        with app.test_client() as client:
            d = {"first_name": "Bobby", "last_name": "Burgers", "img_url": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2657aed-7e3b-42cc-a30e-053044f97216/d8uyqcq-3167ee88-e826-4933-96f8-92d793002d4f.jpg/v1/fill/w_1024,h_1944,q_75,strp/jimmy_pesto__bob_s_burgers__by_frasier_and_niles_d8uyqcq-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTk0NCIsInBhdGgiOiJcL2ZcL2YyNjU3YWVkLTdlM2ItNDJjYy1hMzBlLTA1MzA0NGY5NzIxNlwvZDh1eXFjcS0zMTY3ZWU4OC1lODI2LTQ5MzMtOTZmOC05MmQ3OTMwMDJkNGYuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.f05GYBV4LvhBg70pdJcAy7tBz46YGUUi7pN6QHoi02E"}
            resp = client.post(
                f"/users/{self.user_id}/edit", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn('Bobby Burgers', html)

    def test_delete_user(self):
        with app.test_client() as client:
            resp = client.post(
                f"users/{self.user_id}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertNotIn('<a href="/users/2">Bob Belcher</a>', html)

    def test_new_post_form(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}/posts/new')
            html = resp.get_data(as_text=True)

            self.assertIn('>Add Post for Bob Belcher</h1>', html)
            self.assertIn('method="POST">', html)

    def test_create_post(self):
        with app.test_client() as client:
            d = {"title": "Nachos",
                 "content": "The real tragedy is that I don't have time to get nachos before we start.", "user_id": f"{self.user_id}"}
            resp = client.post(
                f"/users/{self.user_id}/posts/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn('>Nachos</a>', html)

    def test_show_post(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post_id}')
            html = resp.get_data(as_text=True)

            self.assertIn('test post title</h1>', html)
            self.assertIn('test content</p>', html)
            self.assertIn('By Bob Belcher</i>', html)

    def test_edit_post_form(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post_id}/edit')
            html = resp.get_data(as_text=True)

            self.assertIn(
                f'<form action="/posts/{self.post_id}/edit" method="POST">', html)
            self.assertIn('value="test post title"', html)
            self.assertIn('>test content</textarea>', html)

    def test_edit_post(self):
        with app.test_client() as client:
            d = {"title": "edited title",
                 "content": "edited content"}
            resp = client.post(
                f"/posts/{self.post_id}/edit", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn('edited title', html)
            self.assertIn('edited content', html)
            self.assertIn('Post &#34;edited title&#34; has been edited!', html)

    def test_delete_post(self):
        with app.test_client() as client:
            resp = client.post(
                f"/posts/{self.post_id}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn("Post test post title has been deleted!", html)
            self.assertNotIn(">test post title</a>", html)

    def test_list_tags(self):
        with app.test_client() as client:
            resp = client.get('/tags')
            html = resp.get_data(as_text=True)

            self.assertIn('>test tag</a></li>', html)
            self.assertIn('>Add Tag</a>', html)

    def test_show_tag(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag_id}')
            html = resp.get_data(as_text=True)

            self.assertIn('<h1>test tag</h1>', html)
            self.assertIn('>Edit</button>', html)
            self.assertIn('>Delete</button>', html)

    def test_new_tag_form(self):
        with app.test_client() as client:
            resp = client.get('/tags/new')
            html = resp.get_data(as_text=True)

            self.assertIn('<h1>Create a tag</h1>', html)
            self.assertIn('test post title</label>', html)

    def test_create_tag(self):
        with app.test_client() as client:
            d = {"name": "yikes"}
            resp = client.post(f'/tags/new', data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn('yikes</a></li>', html)

    def test_edit_tag_form(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag_id}/edit')
            html = resp.get_data(as_text=True)

            self.assertIn('<h1>Edit the "test tag" tag</h1>', html)
            self.assertIn('test post title</label>', html)

    def test_edit_tag(self):
        with app.test_client() as client:
            d = {"name": "edited tag"}
            resp = client.post(
                f'/tags/{self.tag_id}/edit', data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn('edited tag</a></li>', html)
            self.assertIn('Tag &#34;edited tag&#34; has been edited!', html)

    def test_delete_tag(self):
        with app.test_client() as client:
            resp = client.post(
                f'/tags/{self.tag_id}/delete', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertNotIn('test tag</a></li>', html)
