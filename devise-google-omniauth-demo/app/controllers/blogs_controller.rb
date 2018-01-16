class BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :edit, :update, :destroy]
  # guest user can view and list blogs, logged in users can create, update and destroy blogs, admins can do everything
  access [:all, :user] => [:index, :show], [:editor, :admin] => [:index, :show, :new, :create, :edit, :update, :destroy]

  # GET /blogs
  def index
    @blogs = Blog.all
  end

  # GET /blogs/1
  def show
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
  end

  # GET /blogs/1/edit
  def edit
    if @blog.user.id == current_user.id || logged_in?(:admin)
      render :edit
    else
      redirect_to @blog, notice: 'Permission Denied'
    end
  end

  # POST /blogs
  def create
    @blog = current_user.blogs.build(blog_params)
    if @blog.save
      redirect_to @blog, notice: 'Blog was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /blogs/1
  def update
    if @blog.user.id == current_user.id || logged_in?(:admin)
      if @blog.update(blog_params)
        redirect_to @blog, notice: 'Blog was successfully updated.'
      else
        render :edit
      end
    else
      redirect_to @blog, notice: 'Permission Denied'
    end
  end

  # DELETE /blogs/1
  def destroy
    if @blog.user.id == current_user.id || logged_in?(:admin)
      @blog.destroy
      redirect_to blogs_url, notice: 'Blog was successfully destroyed.'
    else
      redirect_to blogs_path, notice: 'Permission Denied'
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def blog_params
      params.require(:blog).permit(:title, :content, :user_id)
    end
end
