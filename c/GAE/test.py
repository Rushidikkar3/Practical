import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello World")
        print("Hello")

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)