function s(r){const t=r==null?void 0:r.trim();return t?t.startsWith("#")||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.startsWith("//")?t:`#${t.startsWith("/")?t:`/${t}`}`:null}export{s as t};
