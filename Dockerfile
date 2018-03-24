FROM ruby:2.5

RUN apt-get update -qq && \
    apt-get install -y \
      build-essential \
      libpq-dev nodejs

WORKDIR /myapp
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install
COPY . .
