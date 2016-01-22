package com.newsintags.trending.news;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.newsintags.util.MongoDbUtil;

/**
 * Servlet implementation class AddConceptToWishlist
 */
@WebServlet("/AddConceptToWishlist")
public class AddConceptToWishlist extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddConceptToWishlist() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String userName = request.getParameter("userName");
		String likedConcepts = request.getParameter("likedConcepts");
		System.out.println(likedConcepts+"likedConcepts"+userName);
		String callback = request.getParameter("callback");
		JSONObject finalObject = new JSONObject();
		try
		{
			MongoDbUtil.updateUsersWishlist(userName,likedConcepts);
			
		}
		catch(Exception e){
			finalObject.put("status", "failure");
			response.setContentType("application/json");
			response.getWriter().write(callback+"("+finalObject.toString()+")");
		}
		finalObject.put("status", "success");
		response.setContentType("application/json");
		response.getWriter().write(callback+"("+finalObject.toString()+")");
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
