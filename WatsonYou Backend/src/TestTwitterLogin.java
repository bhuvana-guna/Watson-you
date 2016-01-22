

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import oauth.signpost.OAuthProvider;
import oauth.signpost.basic.DefaultOAuthProvider;
import oauth.signpost.commonshttp.CommonsHttpOAuthConsumer;
import oauth.signpost.exception.OAuthCommunicationException;
import oauth.signpost.exception.OAuthExpectationFailedException;
import oauth.signpost.exception.OAuthMessageSignerException;
import oauth.signpost.exception.OAuthNotAuthorizedException;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;

/**
 * Servlet implementation class TestTwitterLogin
 */
@WebServlet("/TestTwitterLogin")
public class TestTwitterLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Twitter twitter;
	private OAuthProvider provider;
	private CommonsHttpOAuthConsumer consumer; 
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestTwitterLogin() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Twitter twitter = new TwitterFactory().getInstance();
		twitter.setOAuthConsumer("0LwdiU3HyPoJohrgEQEdRShry", "bh6R3m4HSyom5VtkzIk9wDOHLqFk9PtLk6btHurwIo0jQuQ7pr");
        
        try {
            String callbackURL = request.getParameter("callback");
            
            RequestToken requestToken = twitter.getOAuthRequestToken("http://newsintagsv2.eu-gb.mybluemix.net/LoginCallback");
           
            request.getSession().setAttribute("twitter", twitter);
            request.getSession().setAttribute("requestToken", requestToken);
            
        	response.setContentType("application/json");
			//response.getWriter().write(twitter.getScreenName());
            response.sendRedirect(requestToken.getAuthenticationURL());

        } catch (TwitterException e) {
            throw new ServletException(e);
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
