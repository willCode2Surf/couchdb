#!/usr/bin/env escript
%% -*- erlang -*-

% Licensed under the Apache License, Version 2.0 (the "License"); you may not
% use this file except in compliance with the License. You may obtain a copy of
% the License at
%
%   http://www.apache.org/licenses/LICENSE-2.0
%
% Unless required by applicable law or agreed to in writing, software
% distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
% WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
% License for the specific language governing permissions and limitations under
% the License.

main(_) ->
    test_util:init_code_path(),

    couch_server_sup:start_link(test_util:config_files()),

    delete_dbs(),
    init_dbs(),

    etap:plan(8),
    case (catch test()) of
        ok ->
            etap:end_tests();
        Other ->
            etap:diag(io_lib:format("Test died abnormally: ~p", [Other])),
            etap:bail(Other)
    end,

    delete_dbs(),

    ok.

init_dbs() ->
    %% init databases
    [couch_db:create(iolist_to_binary([<<"etap-test-db">>,
                                       integer_to_list(I)]), [])
     || I <- lists:seq(0, 10)].


delete_dbs() ->
    {ok, AllDbs} = couch_server:all_databases(),
    %% delete all created dbs
    lists:foreach(fun(DbName) ->
                couch_server:delete(DbName, [])
            end, AllDbs).


server() ->
    lists:concat([
        "http://127.0.0.1:",
        mochiweb_socket_server:get(couch_httpd, port),
        "/"
    ]).


test() ->
    {ok, AllDbs} = couch_server:all_databases(),
    etap:is(12, length(AllDbs), "11 databases was created."),

    Url = server() ++ "_all_dbs",
    {ok, _, _, Body} = ibrowse:send_req(Url, [], get, []),
    AllDbs1 = ejson:decode(Body),
    etap:is(12, length(AllDbs1), "11 databases listed"),


    Url1 = server() ++ "_all_dbs?limit=4",
    {ok, _, _, Body1} = ibrowse:send_req(Url1, [], get, []),
    AllDbs2 = ejson:decode(Body1),
    etap:is(4, length(AllDbs2), "4 databases listed"),

    Url2 = server() ++ "_all_dbs?skip=4&limit=4",
    {ok, _, _, Body2} = ibrowse:send_req(Url2, [], get, []),
    AllDbs3 = ejson:decode(Body2),
    etap:is(4, length(AllDbs3), "4 databases listed"),

    etap:is(true, lists:member(<<"etap-test-db2">>, AllDbs3),
            "etap-test-db2 in list"),

    etap:is(true, lists:member(<<"etap-test-db5">>, AllDbs3),
            "etap-test-db5 in list"),


    etap:is(false, lists:member(<<"etap-test-db10">>, AllDbs3),
            "etap-test-db10 in list"),

    etap:is(false, lists:member(<<"etap-test-db6">>, AllDbs3),
            "etap-test-db6 in list"),


    ok.
