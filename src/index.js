const path = require("path")

export function baseUrl(base) {
    base = base.trim().replace(/\/+$/, '/')
    
    return {
      walkTokens(token) {
        // TODO take in mind that maybe link work better with standard implementation, might be need to distinguish they
        if (!['link', 'image'].includes(token.type)) { return; }
            
            // the URL is already from root
            if (token.href.startsWith('/')) { return; }
            
            try {
                token.href = path.join(base, token.href)
            }
            catch (e) { console.log(e) }
        }
    }
}