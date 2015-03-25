var fs       = require('fs.extra'),
    path     = require('path'),
    format   = require('util').format,
    yargs    = require('yargs'),
    moment   = require('moment'),
    slug     = require('slug'),
    postData = require('./src/posts/post-data.json'),
    archive  = require('./src/posts/post-archive.json');

// Format goes like this: /year/month/day/hour/minute/title
const URL_FORMAT = '/posts/%s/%s/%s/%s/%s/%s'

function getPostTemplate() {
    return fs.readFileSync('./src/_layout/post-template.jade').toString();
}

function main(args) {
    var command = args._[0];
    if(command === 'add') {
        if(!args.title || !args.tags || !args.summary || !args.banner) {
            console.log('You missed a param! Please fix your command.');
            return;
       }

        var now = moment();
        var date = {
            minute: now.minute(),
            hour: now.hour(),
            day: now.date(),
            month: now.month(),
            year: now.year()
       };

        for(var i = 0; i < postData.length; i++)  {
            var post = postData[i];
            var postDate = post.date;

            if(postDate.year === date.year && post.title === args.title) {
                console.log('You already made a post with that title this year. Think of a different title :)');
                return;
           }
       }

        // Start cosntructing the post
        var post = {
            title: args.title,
            date: date,
            url: format(URL_FORMAT,
                        date.year, date.month, date.day, date.hour, date.minute,
                        slug(args.title).toLowerCase()),
            banner: args.banner,
            tags: args.tags.split(' ').map(function(tag) {
                return '#' + tag
           }),
            summary: args.summary
       }

        postData.push(post);

        if(!archive[date.year]) {
            archive[date.year] = {};
       }
        if(!archive[date.year][date.month]) {
            archive[date.year][date.month] = [];
       }

        archive[date.year][date.month].unshift({
            title: post.title,
            url: post.url
       });

        // Write everything to buffer
        fs.writeFileSync('./src/posts/post-data.json', JSON.stringify(postData, null, '    '));
        fs.writeFileSync('./src/posts/post-archive.json', JSON.stringify(archive, null, '    '));

        var postPath = './src' + path.dirname(post.url) + '/' + slug(post.title.toLowerCase()) + '.jade';
        fs.mkdirpSync(path.dirname(postPath));
        var template = getPostTemplate();
        fs.writeFileSync(postPath, format(template, postData.length - 1));


   } else if(command === 'remove') {

        if(args.title) {

            if(!args.year) {
                args.year = moment().year();
           }

            var post = null;
            for(var i = 0; i < postData.length; i++) {
                if(postData[i].title === args.title &&
                    postData[i].date.year === args.year) {
                    post = postData[i];
                    postData.splice(i, 1);
               }
           }

            if(!post) {
                console.log('No post with title "%s" in the year %s was found!', args.title, args.year);
           } else {

                var archivedPosts = archive[post.date.year][post.date.month];
                for(var i = 0; i < archivedPosts.length; i++) {
                    if(archivedPosts[i].title === args.title) {
                        archivedPosts.splice(i, 1);
                   }
               }

                // Save changes yo
                fs.writeFileSync('./src/posts/post-data.json', JSON.stringify(postData, null, '    '));
                fs.writeFileSync('./src/posts/post-archive.json', JSON.stringify(archive, null, '    '));

                var postPath = './src' + path.dirname(post.url) + '/' + slug(post.title.toLowerCase()) + '.jade';
                fs.unlinkSync(postPath);
           }
       } else {
            console.log('You missed a param! Fix you command');
       }

   } else if(command === 'list') {
        if(args.month && typeof args.month === 'string') {
            args.month = moment(args.month, 'MMMM').month();
       } else {
            args.month--;
       }

        var count = 0;
        console.log('Posts:\n');
        for(var i = 0; i < postData.length; i++) {
            var post = postData[i];
            var date = post.date;

            if(args.month >= 0) {
                if(args.month >= 0) {
                    if(args.month !== date.month || args.year !== date.year) continue;
               } else {
                    if(args.month !== date.month) continue;
               }
           } else if(args.year >= 0) {
                if(args.year !== date.year) continue;
           }

            count++;

            console.log('Title: %s', post.title);
            console.log('Date: %s', moment(post.date).format('hh:mm a, MM-DD-YYYY'));
            console.log('Tags: %s', post.tags);
            console.log('Banner: %s', post.banner);
            console.log('URL: %s\n', post.url);
       }

        console.log('Total: %s', count);
   } else if(command === 'update') {
        if(args.page) {
            var pageIndex = -1;
            if(args.page === 'about') {
                pageIndex = 1;
           } else if(args.page === 'banger') {
                pageIndex = 2;
           }

            if(pageIndex !== -1) {
                var now = moment();
                var pageData = require('./src/_data.json');
                pageData[pageIndex].date = {
                    minute: now.minute(),
                    hour: now.hour(),
                    day: now.date(),
                    month: now.month(),
                    year: now.year()
               };
                fs.writeFileSync('./src/_data.json', JSON.stringify(pageData, null, '    '));
           }
       } else if(args.title) {

            if(!args.year) {
                args.year = moment().year();
           }

            var postIndex = -1;
            for(var i = 0; i < postData.length; i++) {
                if(postData[i].title === args.title &&
                    postData[i].date.year === args.year) {
                        postIndex = i;
                   }
           }

            if(postIndex !== -1) {
                var now = moment();
                postData[postIndex].editedDate = {
                    minute: now.minute(),
                    hour: now.hour(),
                    day: now.date(),
                    month: now.month(),
                    year: now.year()
               };

                fs.writeFileSync('./src/posts/post-data.json', JSON.stringify(postData, null, '    '));
           } else {
                console.log('Couldn\'t find post "%s" in the year %s!', args.title, args.year);
           }
       } else {
            console.log('You forgot to add what to update')
       }
   }
}

main(yargs.usage('Usage: $0 add|remove|update|list <Params>')
           .demand(1)
           .example('$0 update --page about', 'Updates the date on the about page')
           .example('$0 update --title "Programming is awesome" --year 2014', 'Updates a post in a certain year')
           .example('--tags "programming math stuff"', 'How to use --tags argument in add command')
           .example('$0 list', 'Lists all posts')
           .example('$0 list --month 1', 'Lists posts in January' )
           .example('$0 list --year 2014', 'Lists posts in 2014')
           .example('$0 list --year 2014 --month January', 'Lists posts in January 2014')
           .example('$0 remove --title "Programming is awesome" --year 2014',
             'Removes post by title in the year 2014(Double posts aren\'t allowed in a single year, so we show only a year.)')
           .example('$0 remove --title "Programming is awesome"', 'Removes the post in the current year')
           .describe('title', 'The title of the post. Used in add|remove commands')
           .describe('tags', 'Relevant post tags. Used in add command')
           .describe('summary', 'A summary of the post. Used in add command')
           .describe('banner', 'The post banner. Used in add command')
           .describe('year', 'Filters post by year. Used in list|remove command')
           .describe('month', 'Filters post by month. Used in list command')
           .describe('page', 'The main page to update')
           .argv);
