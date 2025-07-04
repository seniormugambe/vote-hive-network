import { useState, useEffect } from "react";
async function hasValidKey(lockAddress: string, owner: string, network: number): Promise<boolean> {
  try {
    // getHasValidKey expects (lockAddress, owner, network) as arguments, not an object
    return await web3Service.getHasValidKey(lockAddress, owner, network);
  } catch (e) {
    return false;
  }
}
