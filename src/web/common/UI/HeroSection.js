import React from 'react';
import {Section} from '../UI';

/**
 * A section for the main focus of the page.
 */
export default class HeroSection {
  render() {
    return <Section type="hero">{this.props.children}</Section>;
  }
}


